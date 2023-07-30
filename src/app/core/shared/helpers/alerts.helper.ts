import Swal from 'sweetalert2'

export const successAlert = (title: string, text: string) => {
    Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText: 'Ok'
    })
}

export const errorAlert = (title: string, text: string) => {
    Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

// Del tipo popup, a la derecha y que se cierre solo en 3 segundos
export const warningAlert = (title: string, text: string) => {
    Swal.fire({
        title,
        text,
        icon: 'warning',
        confirmButtonText: 'Ok',
    })
}

