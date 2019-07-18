<template>
    <footer id="footer">
        <div>
            <p>Copyright@2018 备案号：京ICP备17070826号-4</p>
        </div>
        <nav>
            <ul>
                <li>
                    <p>Powered by <a>陕西师范大学</a></p>
                </li>
            </ul>
        </nav>
    </footer>
</template>
      
<style scoped>
#footer {
    height: 53px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #293037;
    padding: 0 20px;
    color: #999;
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