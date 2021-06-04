const vm = Vue.createApp({
  data() {
     return {
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      perspective: 100,
      transformStyle: '',
      copiedActive: false,
      resetActive: false,
    }
  },
  methods: {
    copyToClipBoard() {
      const el = document.createElement('textarea')
      el.value = this.transformStyle                            
      el.setAttribute('readonly', '')              
      el.style.position = 'absolute'                  
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)              
      if (selected) {                                 
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
      this.copiedActive = true
      setTimeout(() => {
        this.copiedActive = false
      }, 1500)
    },
    reset(){
      this.rotationX = 0
      this.rotationY = 0
      this.rotationZ = 0
      this.perspective = 100
      this.transform = ''
      this.resetActive = true
      setTimeout(() => {
        this.resetActive = false
      }, 1500)
    }
  },
  computed: {
    box_styles(){    
      const temp = `transform: perspective(${this.perspective}px) rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg) rotateZ(${this.rotationZ}deg);`
      this.transformStyle = temp;
      return {         
        transform: temp.replace(/[:;]|\btransform\b/g,'')
      }
    }
  }
}).mount('#app')