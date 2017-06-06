var socket = io();
socket.on('getChatRooms', function (rooms) {
  console.log(rooms.length);
  if(rooms.length > 0){
    var select = jQuery('<select></select>');
    select.append(jQuery('<option></option>').text('Select One'));
    rooms.forEach(function (room) {
      select.append(jQuery('<option></option>').text(room));
    });
    jQuery('#chatrooms').html( select);

    select.on('change', function() {
      if(this.value =='Select One'){
        jQuery('#roomname').css("display","block");
      }else{
        jQuery('[type="text"][name="room"]').val(this.value);
        jQuery('#roomname').css("display","none");
      }
    });

  }else {
    jQuery('#chatroomsParentDiv').css("display","none");
  }
});
