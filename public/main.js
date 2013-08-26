var oCache = {
    iCacheLower: -1
};
 
function fnSetKey( aoData, sKey, mValue )
{
    for ( var i=0, iLen=aoData.length ; i<iLen ; i++ )
    {
        if ( aoData[i].name == sKey )
        {
            aoData[i].value = mValue;
        }
    }
}
 
function fnGetKey( aoData, sKey )
{
    for ( var i=0, iLen=aoData.length ; i<iLen ; i++ )
    {
        if ( aoData[i].name == sKey )
        {
            return aoData[i].value;
        }
    }
    return null;
}
 
// Cache function for serer-side paging
function fnDataTablesPipeline ( sSource, aoData, fnCallback ) {
    var iPipe = 5; /* Ajust the pipe size */
     
    var bNeedServer = false;
    var sEcho = fnGetKey(aoData, "sEcho");
    var iRequestStart = fnGetKey(aoData, "iDisplayStart");
    var iRequestLength = fnGetKey(aoData, "iDisplayLength");
    var iRequestEnd = iRequestStart + iRequestLength;
    oCache.iDisplayStart = iRequestStart;
     
    /* outside pipeline? */
    if ( oCache.iCacheLower < 0 || iRequestStart < oCache.iCacheLower || iRequestEnd > oCache.iCacheUpper )
    {
        bNeedServer = true;
    }
     
    /* sorting etc changed? */
    if ( oCache.lastRequest && !bNeedServer )
    {
        for( var i=0, iLen=aoData.length ; i<iLen ; i++ )
        {
            if ( aoData[i].name != "iDisplayStart" && aoData[i].name != "iDisplayLength" && aoData[i].name != "sEcho" )
            {
                if ( aoData[i].value != oCache.lastRequest[i].value )
                {
                    bNeedServer = true;
                    break;
                }
            }
        }
    }
     
    /* Store the request for checking next time around */
    oCache.lastRequest = aoData.slice();
     
    if ( bNeedServer )
    {
        if ( iRequestStart < oCache.iCacheLower )
        {
            iRequestStart = iRequestStart - (iRequestLength*(iPipe-1));
            if ( iRequestStart < 0 )
            {
                iRequestStart = 0;
            }
        }
         
        oCache.iCacheLower = iRequestStart;
        oCache.iCacheUpper = iRequestStart + (iRequestLength * iPipe);
        oCache.iDisplayLength = fnGetKey( aoData, "iDisplayLength" );
        fnSetKey( aoData, "iDisplayStart", iRequestStart );
        fnSetKey( aoData, "iDisplayLength", iRequestLength*iPipe );
         
        $.getJSON( sSource, aoData, function (json) {
            /* Callback processing */
            oCache.lastJson = jQuery.extend(true, {}, json);
             
            if ( oCache.iCacheLower != oCache.iDisplayStart )
            {
                json.aaData.splice( 0, oCache.iDisplayStart-oCache.iCacheLower );
            }
            json.aaData.splice( oCache.iDisplayLength, json.aaData.length );
             
            fnCallback(json)
        } );
    }
    else
    {
        json = jQuery.extend(true, {}, oCache.lastJson);
        json.sEcho = sEcho; /* Update the echo for each response */
        json.aaData.splice( 0, iRequestStart-oCache.iCacheLower );
        json.aaData.splice( iRequestLength, json.aaData.length );
        fnCallback(json);
        return;
    }
}

$(document).ready(function() {
	var oTable = $('#example').dataTable({
        "sDom": 'W<"clear">RlfrtTpi',
        "oColVis": {
            "bRestore": true,
            "aiExclude": [ 0 ]
        },
        /*
        For Scroller
        "sScrollY": "200px",
        "oScroller": {
            "rowHeight": 30
        },
        */
       "oTableTools": {
            "sSwfPath": "bower_components/datatables-tabletools/media/swf/copy_csv_xls_pdf.swf",
            // Select only one row
            "sRowSelect": "single",
            "fnRowSelected": function ( nodes ) {
                console.log( 'row selected' );
            },
            "fnRowDeselected": function ( nodes ) {
                console.log( 'row deselected' );
            },
            "aButtons": [
                "copy",
                "print",
                {
                    "sExtends":    "collection",
                    "sButtonText": "Save",
                    "aButtons":    [ "csv", "xls", "pdf" ]
                },
                {
                    "sExtends":    "text",
                    "sButtonText": "Custom",
                    "fnClick": function ( nButton, oConfig, oFlash ) {
                        alert( 'Mouse click' );
                    }
                }
            ]
        },
        // Paging options
		"bProcessing": true,
		"bServerSide": true,
		"sAjaxSource": 'example',
        "bStateSave": true,
		"fnServerData": fnDataTablesPipeline,
		"aoColumns": [
            { "mData": "engine", sTitle:"engine" },
            { "mData": "browser", sTitle:"browser" },
            { "mData": "platform", sTitle:"platform" },
            { "mData": "details.0", sTitle:"details" },
            { "mData": "details.1", sTitle:"mode details" }
	    ],
        "aoColumnDefs": [{
            "aTargets": [3],
            "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                if ( sData == "1.7" ) {
                $(nTd).css('background-color', 'yellow')
                }
            }
        }]
	}).makeEditable({
        // Cell editing example
        sUpdateURL: "example/add",
        "aoColumns": [
            null,
            {
                indicator: 'Saving CSS Grade...',
                tooltip: 'Click to select CSS Grade',
                loadtext: 'loading...',
                type: 'select',
                onblur: 'submit',
                data: "{'':'Please select...', 'Netscape':'Netscape','Mozilla':'Mozilla','Chrome':'Chrome'}",
                callback: callback,
                submitdata: submitData
            },
            {
                indicator: 'Saving platforms...',
                tooltip: 'Click to edit platforms',
                type: 'textarea',
                submit:'Save changes',
                callback: callback,
                submitdata: submitData
            },
            null,
            null
        ]                                   
    });

    // Functions for cell editing
    function callback (sValue, y) {
        var aPos = oTable.fnGetPosition( this );
        oTable.fnUpdate( sValue.substr(1,sValue.length-2), aPos[0], aPos[1] );
    }

    function submitData(value, settings) {
         var positionRow = oTable.fnGetPosition( this )
        var oSettings = oTable.fnSettings();
        return {
            "_id": oTable.fnGetData()[positionRow[0]]._id,
            "column": oSettings.aoColumns[positionRow[2]].mData
        };
    }


    new AutoFill(oTable);
    new FixedHeader( oTable );
});

function fnShowHide( iCol ) {
    /* Get the DataTables object again - this is not a recreation, just a get of the object */
    var oTable = $('#example').dataTable();
    
    var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
    oTable.fnSetColumnVis( iCol, bVis ? false : true );
}