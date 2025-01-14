function capitalize(word){
    try{
        return word.charAt(0).toUpperCase()+word.slice(1);
    } catch {
        return '';
    }
}