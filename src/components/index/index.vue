<template>
    <div>
        <appheader></appheader>
        <secpart></secpart>
        <pathway></pathway>
        <word></word>
        <signup></signup>
    </div>
</template>

<script>
    import topbar from'./TopBar.vue'
    import appheader from'./Header.vue'
    import secpart from'./SecPart.vue'
    import pathway from'./Pathway.vue'
    import word from'./Word.vue'
    import signup from'./Signup.vue'
    export default {
        name: 'index',
        components:{
            topbar,
            appheader,
            secpart,
            pathway,
            word,
            signup
        },
    }
</script>