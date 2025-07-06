import Swal from 'sweetalert2';

export const mostrarAlert = ({
  icon = 'info',
  title = 'Atención',
  text = '',
} = {}) => {
  return Swal.fire({
    icon,
    title,
    text,
    // No incluimos footer, como pediste
    confirmButtonColor: '#3085d6', // opcional, puedes personalizar estilos aquí
  });
};


// Función reusable para confirmaciones
export const mostrarConfirmacion = async ({
  title = '¿Estás seguro?',
  text = 'Esta acción no se puede deshacer.',
  confirmButtonText = 'Sí, eliminar',
  cancelButtonText = 'Cancelar',
  icon = 'warning',
} = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#aaa',
    confirmButtonText,
    cancelButtonText,
  });

  return result.isConfirmed; // true si usuario confirma, false si cancela
};