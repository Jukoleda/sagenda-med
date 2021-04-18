$(function() {

    $(document).on('click', '.eliminarContacto', function () {
        var id = $(this).data('id');
        if(id){
            var formulario = document.createElement("form");
            var hidden = document.createElement('input');
            formulario.action = '/eliminar_contacto';
            formulario.method = 'POST';

            hidden.type = 'hidden';
            hidden.name = 'id';
            hidden.value = id;

            formulario.appendChild(hidden);
            
            document.body.append(formulario);
            
            formulario.submit();
        }
     });

     $(document).on('click', '.modificarContacto', function () {
        var id = $(this).data('id');
        if(id){
            var formulario = document.createElement("form");
            var hidden = document.createElement('input');
            formulario.action = '/modificar_contacto_formulario';
            formulario.method = 'POST';

            hidden.type = 'hidden';
            hidden.name = 'id';
            hidden.value = id;

            formulario.appendChild(hidden);
            
            document.body.append(formulario);
            
            formulario.submit();
        }
     });
});