class Value{
    constructor(id){
        this._id = id;
    }

    _updateValue(){
        const value = document.getElementById(this._id).value;
        return value ? value : '';
    }

    get value(){
        return this._updateValue();
    }
}