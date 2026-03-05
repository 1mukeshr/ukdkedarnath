/**
 * UKD Kedarnath - Form helpers: validation, errors, success messages
 */
window.UKDForms = {
  /** Show in-page success message and optionally hide the form */
  showSuccess: function(options) {
    var container = options.container;
    var message = options.message || 'Thank you! Your submission has been received.';
    var title = options.title || 'Success';
    var hideForm = options.hideForm !== false;
    var form = options.form;
    var actionUrl = options.actionUrl || '';
    var actionLabel = options.actionLabel || '';

    if (!container) return;

    var successEl = container.querySelector('.form-success');
    var actionHtml = (actionUrl && actionLabel) ? '<p class="form-success-actions"><a href="' + this.escapeHtml(actionUrl) + '" class="btn btn-primary">' + this.escapeHtml(actionLabel) + '</a></p>' : '';
    if (!successEl) {
      successEl = document.createElement('div');
      successEl.className = 'form-success';
      successEl.setAttribute('role', 'status');
      successEl.innerHTML =
        '<div class="form-success-icon" aria-hidden="true">✓</div>' +
        '<h3>' + this.escapeHtml(title) + '</h3>' +
        '<p>' + this.escapeHtml(message) + '</p>' +
        actionHtml;
      var insertBefore = form && form.parentNode === container ? form : container.firstChild;
      container.insertBefore(successEl, insertBefore);
    } else {
      var h3 = successEl.querySelector('h3');
      var p = successEl.querySelector('p');
      var actionsWrap = successEl.querySelector('.form-success-actions');
      if (h3) h3.textContent = title;
      if (p) p.textContent = message;
      if (actionHtml) {
        if (actionsWrap) actionsWrap.outerHTML = actionHtml;
        else successEl.insertAdjacentHTML('beforeend', actionHtml);
      } else if (actionsWrap) actionsWrap.remove();
    }

    successEl.classList.add('is-visible');
    successEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (hideForm && form) {
      form.style.display = 'none';
    }
  },

  /** Show error under a field; wrap input in .form-group and add .form-error */
  showFieldError: function(input, message) {
    var group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    var err = group.querySelector('.form-error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'form-error';
      err.setAttribute('role', 'alert');
      input.parentNode.appendChild(err);
    }
    err.textContent = message;
  },

  /** Clear all errors in a form */
  clearErrors: function(form) {
    if (!form) return;
    form.querySelectorAll('.form-group.has-error').forEach(function(g) {
      g.classList.remove('has-error');
    });
    form.querySelectorAll('.form-error').forEach(function(e) {
      e.textContent = '';
    });
  },

  /** Set button loading state */
  setButtonLoading: function(btn, loading) {
    if (!btn) return;
    if (loading) {
      btn.classList.add('is-loading');
      btn.disabled = true;
    } else {
      btn.classList.remove('is-loading');
      btn.disabled = false;
    }
  },

  escapeHtml: function(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};
