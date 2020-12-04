import {$} from "../../core/DOM"

export function resizeHandler($root, event) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type = "resizable"]')
            const coords = $parent.getCoords()
            const numCol = event.target.dataset.number_col
            const type = $resizer.data.resize
            const sideProp = type === 'col' ? 'bottom' : 'right'
            $resizer.css({
                opacity: 1,
                [sideProp]: "-5000px",
            })
            let deltaCol
            let deltaRow

            document.onmousemove = (e) => {
                if (type ==='col') {
                deltaCol = e.clientX+3 - coords.right
                $resizer.css({right: -deltaCol + 'px'})
                } else {
                    deltaRow = e.clientY+3 - coords.bottom
                    $resizer.css({bottom: -deltaRow + 'px'})
                }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null

                if (type === 'col') {
                const value = coords.width + deltaCol
                $parent.css({width: value + 'px'})
                $root.findAll(`[data-number_cell = "${numCol}"]`)
                .forEach((el) => el.style.width = value + 'px')
                $resizer.css({
                    opacity: 0,
                    right: 0,
                    bottom: 0,
                })
            } else {
                const value = coords.height + deltaRow
                $parent.css({height: value + 'px'})
                $resizer.css({
                    opacity: 0,
                    bottom: 0,
                    right: 0,
                })
            }
        }
    }
}
