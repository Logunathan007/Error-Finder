function getValidationErrors(formGroup, parentKey = '') {
  const errors = [];

  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.get(key);
    const controlName = parentKey ? `${parentKey}.${key}` : key;

    if (control.controls) {
      // It's a FormGroup or FormArray
      errors.push(...getValidationErrors(control, controlName));
    } else {
      const controlErrors = control?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          errors.push({
            control: controlName,
            error: errorKey,
            value: controlErrors[errorKey]
          });
        });
      }
    }
  });

  return errors;
}
