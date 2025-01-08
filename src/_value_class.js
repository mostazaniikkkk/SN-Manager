class Value{
    constructor(id){
        this._id = id;
    }

    _updateValue(){
        return document.getElementById(this._id).value;
    }

    get value(){
        return this._updateValue();
    }
}