
    export function openModal(id) {
        document.getElementById(id).classList.remove('hidden')
    }

    export function closeModal(id) {
        document.getElementById(id).classList.add('hidden')
    }

    export function enableModal(id) { // Activer le comportement de la modal
        const modal = document.getElementById(id)
        modal.querySelector('.modal-close').addEventListener('click', () => {
            closeModal(id)
        })
        modal.querySelector('.modal-body').addEventListener('click', e => {
            e.stopPropagation()
        })

        modal.addEventListener('click', () => {
            closeModal(id)
        })
    }
