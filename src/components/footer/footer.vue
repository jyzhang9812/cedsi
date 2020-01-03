<template>
    <footer id="footer">
        <div>
            <p>Copyright&nbsp;&copy;&nbsp;2018&nbsp;备案号：京ICP备17070826号-4</p>
        </div>
    </footer>
</template>
      
<style scoped>
#footer {
    width: 100%;
    height: 53px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #293037;
    color: #999;
    bottom: 0;
}
p{
    margin: 0;
}

nav {
    height: 100%;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
}

li, li a{
    margin: 0 6px;
    color: #999;
}

li a:hover {
    cursor: pointer;
    text-decoration: none;
    color: #fff;
}
</style>