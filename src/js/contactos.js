$(function() {

     $('.eliminarContacto').on('click', () => {
        var id = $(this).data('id');
        if(id){
            $.post('/eliminar_contacto/', {numero: id});
        }
     });
     $('.modificarContacto').on('click', () => {
         console.log($(this))
        var id = $(this).data();
        console.log(id)
        if(id){

            $.post('/modificar_contacto_formulario/', {numero: id});
           
        }
     });
});