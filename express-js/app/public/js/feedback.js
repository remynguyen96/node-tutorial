$(function(){
  $.getJSON('api',updateData);

  $(".feedback-form").submit(function(e){
    e.preventDefault();
    $.post('api',{
      name : $("#feedback-form-name").val(),
      title : $("#feedback-form-title").val(),
      message : $("#feedback-form-message").val(),
    },updateData);
    $("#feedback-form-name").val('');
    $("#feedback-form-title").val('');
    $("#feedback-form-message").val('');
  });

  $(".feedback-messages").on('click',function(e){
      if(e.target.className === 'glyphicon glyphicon-remove'){
        $.ajax({
          url : 'api/'+ e.target.id,
          type : 'DELETE',
          success : updateData,
        });
      }
  });

  function updateData(data){
    var output = '';
    $.each(data,function(key, item) {
     output += '     <div class="list-group feedback-item item-list media-list">';
     output += '       <div class="list-group-item feedback-item media" style="color:blue">';
     output += '         <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="'+ key +'" class="glyphicon glyphicon-remove"></span></button></div>';
     output += '         <div class="feedback-info media-body">';
     output += '           <div class="feedback-head">';
     output += '             <div class="feedback-title">' + item.title + '<small class="feedback-name label label-info">' + item.name + '</small></div>';
     output += '           </div>';
     output += '           <div class="feedback-message">' + item.message + '</div>';
     output += '         </div>';
     output += '       </div>';
     output += '     </div>';
     output += '     <hr>';
   });
   $('.feedback-messages').html(output);
  }




});
