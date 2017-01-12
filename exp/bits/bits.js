var hexdump = {

    dumpLine: function (line) {
        var result = "";
        var n = line.length;
        for (var i = 0; i < 16; i++) {
            if (i == 8)
                result += " ";
            if (i < n) {
                result += this.dumpChar(line.charCodeAt(i));
            } else {
                result += "..";
            }
            result += " ";
        }
        return result;
    },


    dumpChar: function (char) {
        var result = ("0" + char.toString(16)).substr(-2);
        return result;
    },

    dump: function (str) {
        var result = "";
        var lines = str.match(/(.|[\r\n]){1,16}/g);
        var count = 0;
        for (var i = 0, n = lines.length; i < n; i++) {
            var lineNum = ("0000000" + count.toString(16)).substr(-8) + " | ";
            result = result + this.dumpLine(lines[i]) + "\n";
            count += 16;
        }
        return result;
    }
}

var base64 = {
    encode: function (str) {
        
    }, 
    
    decode: function (str) {
        
    }
}


$(function () {

    $('#dumpBtn').on('click', function () {
        var input = $("#hexIn").val();
        if (input != "" && input.length > 0) {
            var result = hexdump.dump(input);
            $('#hexOut').val(result);
        } else {
            console.log("Empty input");
        }

    });
})