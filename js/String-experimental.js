/**
* String.prototype.split(delim, limit)
*
* @description
* Returns the array of strings that results when a string is separated into substrings.
* The result of the split method is an array of strings split at each point where 
* separator occurs in the string. The separator is not returned as part of any array element.
*
* @note
* This method is overrides the native Array.prototype.split method because of 
* the optional 'limit' argument does not correctly splits a string to the array items. 
* The original method is stored as Array.prototype.__split__
*
* The follow example does not work corredctly with the native Array.prototype.split:
* <code>
* var str = "a b c d e f";
* var arr = str.split(" ", 3);
* 
* // expected and returned with overriden method ["a", "b", "c d e f"]
* // really returned with the native method ["a", "b", "c"]
* </code>

* @param  mixed    delim    A string or an instance of a Regular Expression object identifying 
*                           one or more characters to use in separating the string. If omitted, 
*                           a single-element array containing the entire string is returned. 
* @param  integer  limit    Optional. A value used to limit the number of elements returned in the array.
*
* @result Array
* @see    http://forum.dklab.ru/viewtopic.php?p=74826
*         http://msdn.microsoft.com/library/default.asp?url=/library/en-us/jscript7/html/jsmthsplit.asp
*         http://wdh.suncloud.ru/js09.htm#hsplit
*/
String.prototype.__split__ = String.prototype.split;
String.prototype.split = function(delim, limit)
{
    if (limit && limit > 0) {
        var isRegExp = delim && delim.constructor == RegExp;
        if (isRegExp) {
            var res = delim.source;
            var ref = "";
            if (delim.ignoreCase) ref += "i";
            if (delim.multiline) ref += "m";
//            if (delim.global) ref += "g";
        } else {
            var res = delim;
            var ref = "";
        }
        var x = this.match(new RegExp("^((?:.*?" + res + "){" + (limit - 1) + "})(.*)", ref));
        if (x) {
            var result = x[1].__split__(delim, limit);
            var n = result.length;
            if (!isRegExp && n) n--;
            result[n] = x[2];
            return result;
        }
        return this.valueOf();
    }
    return this.__split__(delim, limit);
}
