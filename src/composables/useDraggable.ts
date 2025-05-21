import { Ref, onMounted, onUnmounted } from 'vue'

export function useDraggable(elementRef: Ref<HTMLElement | null>) {
  let isDragging = false
  let offsetX = 0
  let offsetY = 0

  const startDrag = (x: number, y: number) => {
    if (!elementRef.value) return
    isDragging = true
    const rect = elementRef.value.getBoundingClientRect()
    offsetX = x - rect.left
    offsetY = y - rect.top
    elementRef.value.style.cursor = 'grabbing'
    elementRef.value.style.userSelect = 'none'
  }

  const doDrag = (x: number, y: number) => {
    if (!isDragging || !elementRef.value) return
    const left = x - offsetX
    const top = y - offsetY
    elementRef.value.style.position = 'absolute'
    elementRef.value.style.left = `${left}px`
    elementRef.value.style.top = `${top}px`
  }

  const endDrag = () => {
    if (!elementRef.value) return
    isDragging = false
    elementRef.value.style.cursor = 'grab'
    elementRef.value.style.userSelect = ''
  }

  const handleMouseDown = (e: MouseEvent) => {
    startDrag(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: MouseEvent) => {
    doDrag(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    endDrag()
  }

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startDrag(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    doDrag(touch.clientX, touch.clientY)
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    endDrag()
  }

  onMounted(() => {
    if (!elementRef.value) return

    // 鼠标事件
    elementRef.value.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // 触摸事件
    elementRef.value.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    // 设置初始光标
    elementRef.value.style.cursor = 'grab'
  })

  onUnmounted(() => {
    if (!elementRef.value) return

    // 移除鼠标事件
    elementRef.value.removeEventListener('mousedown', handleMouseDown)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    // 移除触摸事件
    elementRef.value.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  })
} 