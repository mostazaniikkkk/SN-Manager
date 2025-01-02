function addElement(element, id, func){
    const htmlString = element;
    const element = document.getElementById(id);
    element.innerHTML += htmlString; 

    element.addEventListener("click", func);
}