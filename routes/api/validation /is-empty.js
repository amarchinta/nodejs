const  isEmpty = value =>
        value === undefined ||
        value === null ||
        
        
        
        (typeof value === 'object' && object.keys(value).length === 0) ||
        (typeof value ==='string' && value.trim().length ===0);
    
        module.exports =isEmpty;


