function clearElements(objects) {
    objects.forEach(element => {
      const elementObj = document.getElementById(element);
      if (elementObj && elementObj.value !== undefined) {
        elementObj.value = "";
      }
    });
  }