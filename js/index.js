/**
 * Created by TD on 2015-11-24.
 */
(function() {

    var model = {};

    model.nodeList = [];
    model.nodeCount = 0;

    model.addNode = function(node) {
        node.tickData = node.tickData ? node.tickData : {};
        model.nodeList.push(node);
    };

    model.getNode = function(nodeId) {
        var len = model.nodeList.length;
        for (var i=0; i<len; i++) {
            var node = model.nodeList[i];
            if (node.nodeId == nodeId) {
                return node;
            }
        }
    };

    model.deleteNode = function(nodeId) {
        var len = model.nodeList.length;
        for (var i=0; i<len; i++) {
            var node = model.nodeList[i];
            if (node.nodeId == nodeId) {
                model.nodeList.splice(i);
                break;
            }
        }
    };

    model.getNodeTemplate = function(node) {
      var html = '<div class="node" id="node-' + node.nodeId + '">'
        + '<div class="node-id">' + node.nodeId + '</div>'
        + '<div class="node-name">' + node.nodeName + '</div>'
        + '</div>';
        return html;
    };

    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";

        var weekName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        var d = this;

        return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekName[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };
    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};
    setInterval( function () {
        $( '#header .time' ).html(new Date().format("yyyy-MM-dd E  hh:mm:ss"));
    }, 1000);

    //initialize ui
    $(function() {

        //initialize dialog
        var add_dialog = $( '.dialog-add-node' ).dialog({
            resizable: false,
            autoOpen: false,
            modal: true,
            buttons: {
                "추가" : function() {
                    var node = {};
                    node.nodeId = $(this).find('#new_node_id').val();
                    node.nodeName = $(this).find('#new_node_name').val();

                    model.addNode(node);

                    var $html = $(model.getNodeTemplate(node)).draggable();;
                    //$('#node-container').append($html);
                    $('#svg').append($html);
                    $(this).dialog( 'close' );
                },
                "닫기" : function () {
                    $(this).dialog( 'close' );
                }
            }
        });

        //initialize event handler
        $('.btn-add').on('click', function() {
            add_dialog.dialog( 'open' );
        });

        $('.btn-edit').on('click', function() {

            $('#container').find('#home-block').hide();
            $('#tools_left').show();
            $('#tools_bottom').show();

            $('.btn-add').hide();
            $('.btn-edit').hide();
            $('.btn-statistic').hide();
            $('.btn-home').show();

        });


        $('.btn-home').on('click', function() {

            $('#container').find('#home-block').show();
            $('#tools_left').hide();
            $('#tools_bottom').hide();

            $('.btn-add').show();
            $('.btn-edit').show();
            $('.btn-statistic').show();
            $('.btn-home').hide();

        });

    });


})(window, document);