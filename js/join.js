// Join form - populate districts, validate, show errors & success
(function() {
  if (!window.UKD_DATA) return;

  var districtSelect = document.getElementById('district');
  var constituencySelect = document.getElementById('constituency');
  var blockSelect = document.getElementById('block');
  var boothSelect = document.getElementById('booth');
  var form = document.getElementById('joinForm');
  var formCard = form ? form.closest('.form-card') : null;

  function fillDistricts() {
    if (!districtSelect) return;
    UKD_DATA.districts.forEach(function(d) {
      var opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = d.name + ' (' + d.nameEn + ')';
      districtSelect.appendChild(opt);
    });
  }

  function fillConstituencies(districtId) {
    if (!constituencySelect) return;
    constituencySelect.innerHTML = '<option value="">Select Constituency</option>';
    if (!districtId) return;
    var list = UKD_DATA.constituencies[districtId] || [];
    list.forEach(function(name) {
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      constituencySelect.appendChild(opt);
    });
  }

  function fillBlocks(districtId) {
    if (!blockSelect) return;
    blockSelect.innerHTML = '<option value="">Select Block</option>';
    if (!districtId) return;
    var list = UKD_DATA.blocks[districtId] || [];
    list.forEach(function(name) {
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      blockSelect.appendChild(opt);
    });
  }

  function fillBooths() {
    if (!boothSelect) return;
    boothSelect.innerHTML = '<option value="">Select Booth</option>';
    (UKD_DATA.booths.default || []).forEach(function(name) {
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      boothSelect.appendChild(opt);
    });
  }

  if (districtSelect) {
    fillDistricts();
    fillBooths();
    districtSelect.addEventListener('change', function() {
      var id = this.value;
      if (constituencySelect) {
        constituencySelect.disabled = !id;
        fillConstituencies(id);
      }
      if (blockSelect) {
        blockSelect.disabled = !id;
        fillBlocks(id);
      }
    });
    if (constituencySelect) constituencySelect.disabled = true;
    if (blockSelect) blockSelect.disabled = true;
  }

  function validateJoinForm() {
    var errors = [];
    if (!window.UKDForms) return true;

    UKDForms.clearErrors(form);

    var fullName = form.querySelector('[name="fullName"]');
    if (!fullName || !fullName.value.trim()) {
      UKDForms.showFieldError(fullName, 'Please enter your full name.');
      errors.push(fullName);
    } else if (fullName.value.trim().length < 2) {
      UKDForms.showFieldError(fullName, 'Name should be at least 2 characters.');
      errors.push(fullName);
    }

    var email = form.querySelector('[name="email"]');
    if (!email || !email.value.trim()) {
      UKDForms.showFieldError(email, 'Please enter your email.');
      errors.push(email);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      UKDForms.showFieldError(email, 'Please enter a valid email address.');
      errors.push(email);
    }

    var mobile = form.querySelector('[name="mobile"]');
    if (!mobile || !/^[0-9]{10}$/.test((mobile.value || '').trim())) {
      UKDForms.showFieldError(mobile, 'Please enter a valid 10-digit mobile number.');
      errors.push(mobile);
    }

    var district = form.querySelector('[name="district"]');
    if (!district || !district.value) {
      UKDForms.showFieldError(district, 'Please select your district.');
      errors.push(district);
    }

    var constituency = form.querySelector('[name="constituency"]');
    if (!constituency || !constituency.value) {
      UKDForms.showFieldError(constituency, 'Please select constituency.');
      errors.push(constituency);
    }

    var booth = form.querySelector('[name="booth"]');
    if (!booth || !booth.value) {
      UKDForms.showFieldError(booth, 'Please select booth.');
      errors.push(booth);
    }

    var gender = form.querySelector('[name="gender"]');
    if (!gender || !gender.value) {
      UKDForms.showFieldError(gender, 'Please select gender.');
      errors.push(gender);
    }

    var dob = form.querySelector('[name="dob"]');
    if (!dob || !dob.value) {
      UKDForms.showFieldError(dob, 'Please select date of birth.');
      errors.push(dob);
    }

    var role = form.querySelector('[name="role"]');
    if (!role || !role.value) {
      UKDForms.showFieldError(role, 'Please select join as Member or Leader.');
      errors.push(role);
    }

    if (errors.length > 0) {
      errors[0].focus();
      return false;
    }
    return true;
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!validateJoinForm()) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      if (window.UKDForms) {
        UKDForms.setButtonLoading(submitBtn, true);
      }

      setTimeout(function() {
        if (window.UKDForms) {
          UKDForms.setButtonLoading(submitBtn, false);
          UKDForms.showSuccess({
            container: formCard,
            form: form,
            title: 'Application Submitted',
            message: 'Thank you! Your application has been received. Our team will connect with you soon.'
          });
        } else {
          alert('Thank you! Your application has been submitted. Our team will connect with you soon.');
        }
        form.reset();
        if (districtSelect) {
          if (constituencySelect) constituencySelect.innerHTML = '<option value="">Select Constituency</option>';
          if (blockSelect) blockSelect.innerHTML = '<option value="">Select Block</option>';
          fillBooths();
        }
      }, 600);
    });

    form.querySelectorAll('input, select').forEach(function(el) {
      el.addEventListener('input', function() {
        var group = this.closest('.form-group');
        if (group && group.classList.contains('has-error')) {
          group.classList.remove('has-error');
          var err = group.querySelector('.form-error');
          if (err) err.textContent = '';
        }
      });
      el.addEventListener('change', function() {
        var group = this.closest('.form-group');
        if (group && group.classList.contains('has-error')) {
          group.classList.remove('has-error');
          var err = group.querySelector('.form-error');
          if (err) err.textContent = '';
        }
      });
    });
  }
})();
