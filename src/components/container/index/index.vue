<template>
    <div>
        <slidepic></slidepic>
        <secpart></secpart>
        <pathway></pathway>
        <word></word>
        <joinin></joinin>
    </div>
</template>

<script>
    // import topbar from'./TopBar.vue'
    import slidepic from'./SlidePic.vue'
    import secpart from'./SecPart.vue'
    import pathway from'./Pathway.vue'
    import word from'./Word.vue'
    import joinin from'./JoinIn.vue'
    export default {
        name: 'index',
        components:{
            // topbar,
            slidepic,
            secpart,
            pathway,
            word,
            joinin,
        },
    }
</script>