
class ExpectedInstanceError extends TypeError {
    constructor(source, sourceDescrition, expected, superclass) {
        let sourceName = source.name ? source.name : source.constructor.name != "String" ? source.constructor.name : source;
        let objType = typeof (expected);
        let objTypeArticle = objType.charAt(0).search(/[aeiouAEIOU]/) == -1 ? "a" : "an";
        super(`${sourceName}${sourceDescrition} must implements ${superclass.name}. Instead of that recieved ${objTypeArticle} ${objType} that ${expected == undefined ? 'implements nothing' : expected == null ? 'is null' : "implements " + expected.constructor.name}`);
    }
}

class ExpectedParameterInstanceError extends ExpectedInstanceError {
    constructor(source, sourceDescrition, parameterName, expected, superclass) {

        let parameterArticle = parameterName.charAt(0).search(/[aeiouAEIOU]/) == -1 ? "a" : "an";
        super(source, `${sourceDescrition} must recieve ${parameterArticle} ${parameterName} that`, expected, superclass);
    }
}

class ExpectedParameterWithKeyError extends TypeError {
    constructor(source, sourceDescrition, parameterName, expected, keys) {
        let sourceName = source.name ? source.name : source.constructor.name != "String" ? source.constructor.name : source;
        let parameterType = typeof (expected);
        let parameterTypeArticle = parameterType.charAt(0).search(/[aeiouAEIOU]/) == -1 ? "a" : "an";
        let keyNamePrefix = keys instanceof Array ? "keys" : "key";
        let keyName = keys instanceof Array ? keys.join(", ") : keys;
        super(`${sourceName}${sourceDescrition} must recieve ${parameterName} with ${keyNamePrefix} ${keyName}. ${parameterName.charAt(0).toUpperCase() + parameterName.slice(1)} is ${parameterTypeArticle} ${parameterType} that ${expected == undefined ? 'implements nothing' : expected == null ? 'is null' : "implements " + expected.constructor.name}`);
    }
}

function isInstanceOf(object, superclass) {
    return (superclass.isMixin && object["is" + superclass.name]) || object instanceof superclass;
}

function _validate(source, sourceDescrition = undefined) {
    return {
        expect: function (expected) {
            return {
                toBeInstanceOf: function (superclass) { if (!isInstanceOf(expected, superclass)) throw new ExpectedInstanceError(source, sourceDescrition, expected); else return true; }
            };
        },
        expectParameter: function (parameterName, expected) {
            return {
                toBeInstanceOf: function (superclass) {
                    if (!isInstanceOf(expected, superclass)) throw new ExpectedParameterInstanceError(source, sourceDescrition, parameterName, expected, superclass); else return true;
                },
                withKey: function (keyName) { if (!expected && expected[keyName] == undefined) throw new ExpectedParameterWithKeyError(source, sourceDescrition, parameterName, expected, keyName); else return true; },
                withKeys: function (...keys) {
                    let missingKeys = [];
                    for (i in keys) {
                        let keyName = keyName[i];
                        if (!expected && expected[keyName] == undefined) {
                            missingKeys.push(keyName);
                        }
                    }
                    if (missingKeys.length > 0) throw new ExpectedParameterWithKeyError(source, sourceDescrition, parameterName, expected, missingKeys);
                    else return true;
                }
            };
        }
    };
}
