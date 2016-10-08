//********************************************************************************************
/**
 * the global Variable
 * 页面显示相关
 */
var dialog;//此变量的作用是，根据用户的点击事件（如当点击编辑按钮的时候）出现相应的对话框，该变量保存编辑信息的对话框
var editElement;//此变量的作用是记录当前需要修改的是哪一行，当用户修改完成之后，把相应的内容更行至相应的表格中

//********************************************************************************************

$(document).ready(function () {
	registerEventListerAddInPage();//给网页的元素添加注册事件，和分页没有关系，可以根据不同的情况删除该函数
});

function registerEventListerAddInPage()
{
	dialog = $("#modifyw").dialog({
	      autoOpen: false,
	      closeText: "hide",
	      height: "auto",
	      width: "500px",
	      modal: true,
	      buttons: {
	       "确定": modifyUser,
	       "取消": function() {
	          dialog.dialog( "close" );
	        }
	      },
	      close: function() {
//	        form[ 0 ].reset();
//	        allFields.removeClass( "ui-state-error" );
	      }
	    });
	
	xiangxidialog = $("#xiangxiw").dialog({
	      autoOpen: false,
	      closeText: "hide",
	      height: "auto",
	      width: "500px",
	      modal: true,
//	      buttons: {
//	       "确定": modifyUser,
//	       "取消": function() {
//	          dialog.dialog( "close" );
//	        }
//	      },
	      close: function() {
//	        form[ 0 ].reset();
//	        allFields.removeClass( "ui-state-error" );
	      }
	    });
}
function modifyUser()
{
	var actionUrl = "modifyUser.action";
	
	 var id=$.trim($("#userid").val());
	 var tel=$.trim($("#tel").val());
	 var mail=$.trim($("#mail").val());
	 var status=$('input[name="status"]:checked').val();

	 
	 var params=
	 {
		   "id":id,
           "tel":tel,
           "mail":mail,
           "status":status
	 };
	 
	$.ajax( { // 修改语言
		url : actionUrl,
		type : "post",
		data:params,
		dataType : "json",
		error : function(data) 
		{
			alert("修改失败!!!!");
		},
		success : function(data) 
		{
			alert("修改成功！");
			updateDateInThePage(tel,mail,status);
			dialog.dialog( "close" );
		}
	});// end of ajax
}
/**
 * 更新页面中表格中的内容
 * @param name
 * @param beizhu
 * @param status
 */
function updateDateInThePage(tel,mail,status)
{
	//console.log($(editElement).parent(".mui_operate").html());
	//console.log($(editElement).parent(".mui_operate").prevAll(".mui_name").html());
	
	$(editElement).parent(".mui_operate").prevAll(".mui_tel").html(tel);
	$(editElement).parent(".mui_operate").prevAll(".mui_mail").html(mail);

	var tempStatus=showConvert(status); //showConvert函数在pagination.js中
	$(editElement).parent(".mui_operate").prevAll(".mui_status").html(tempStatus);
}