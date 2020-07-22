$(function(){
  function buildHTML(message){
    if (message.image){
      let html = 
          `<div class="messagebox">
            <div class="massage_natime">
              <div class="message_name">
                ${message.user_name}
              </div>
              <div class="message_time">
                ${message.created_at}
              </div>
            </div>
            <div class="message_content">
              <p class="content-message">
                ${message.content}
              </p>
              <img class="image-message" src="${message.image}">
            </div>
          </div>`
      return html;
    } else {
      let html =
      `<div class="messagebox">
        <div class="message_natime">
          <div class="message_name">
            ${message.user_name}
          </div>
          <div class="message_time">
            ${message.created_at}
          </div>
        </div>
        <div class="message_content">
          <p class="content-message">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

    $(".form").on('submit', function(e){
      e.preventDefault();
      let formData = new FormData(this);
      let url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      debugger
      $('.message_field').append(html);
      $('.message_field').animate({ scrollTop: $('.message_field')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-put').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});