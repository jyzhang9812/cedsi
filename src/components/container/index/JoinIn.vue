<template>
    <!-- Footer -->
    <footer class="pt-5 pb-4" id="contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-6 mt-2 mb-4">
                    <h4 class="mb-4 font-weight-bold">关于我们</h4>
                    <ul class="f-address">
                        <li>
                            <div class="row">
                                <div class="col-1"><i class="fa fa-large fa-map-marker"></i></div>
                                <div class="col-10">
                                    <h5 class="font-weight-bold mb-0">地址:</h5>
                                    <p>西安曲江新区翠华南路1688号曲江创客大街1505号</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-1"><i class="fa fa-envelope"></i></div>
                                <div class="col-10">
                                    <h5 class="font-weight-bold mb-0">邮箱:</h5>
                                    <p><a href="#">Support@userthemes.com</a></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-1">
                                    <i class="fa fa-volume-control-phone"></i>
                                </div>
                                <div class="col-10">
                                    <h5 class="font-weight-bold mb-0">电话:</h5>
                                    <p><a href="#">+86 XX-XXXX-XXXX</a></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-6">
                    <h4>合作学校</h4>
                    <ul class="list-unstyled socila-list">
                        <li><img src="http://placehold.it/64x64" alt="" /></li>
                        <li><img src="http://placehold.it/64x64" alt="" /></li>
                        <li><img src="http://placehold.it/64x64" alt="" /></li>
                        <li><img src="http://placehold.it/64x64" alt="" /></li>
                        <li><img src="http://placehold.it/64x64" alt="" /></li>
                        <li><img src="http://placehold.it/64x64" alt="" /></li>
                        <li><img src="http://placehold.it/64x64" alt="" /></li>
                        <li><img src="http://placehold.it/64x64" alt="" /></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6 mt-2 mb-4">
                    <h4 class="mb-4 font-weight-bold">与我们联系:</h4>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="您的邮箱地址">
                        <span class="input-group-addon" id="basic-addon2"><i class="fa fa-search"></i></span>
                    </div>
                    <ul class="social-pet mt-4">
                        <li><a href="#"><i class="fa fa-lg fa-envelope"></i></a></li>
                        <li><a href="#"><i class="fa fa-lg fa-qq"></i></a></li>
                        <li><a href="#"><i class="fa fa-lg fa-weibo"></i></a></li>
                        <li><a href="#"><i class="fa fa-lg fa-weixin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'Signup',
        data() {
            return {
            }
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*=-footer-=*/
    footer {
        color: #fff;
        background: #222;
        padding-top: 20px;
        background-attachment: fixed;
        background-size: cover;
        background-position: bottom;
    }

    footer p {
        color: #ccc;
    }

    footer a {
        color: #ccc;
    }

    .social-pet li {
        display: inline-block;
        margin-right: 10px;
        margin-top: 10px;
    }

    .social-pet li a {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        text-align: center;
        display: block;
        line-height: 40px;
        background-color: #3a5a95;
        color: #fff;
    }

    .social-pet li:nth-child(2) a {
        background-color: #57aced;
    }

    .social-pet li:nth-child(3) a {
        background-color: #dd4f43;
    }

    .social-pet li:nth-child(4) a {
        background-color: rgb(49, 182, 16);
    }

    .social-pet li a:hover {
        background-color: #ffbf35;
    }

    .social-pet li a:hover i {
        transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }

    footer .socila-list {
        overflow: hidden;
        margin: 20px 0 10px;
    }

    footer .socila-list li {
        float: left;
        margin-bottom: 20px;
        margin-right: 20px;
        opacity: 0.7;
        overflow: hidden;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
    }

    footer .socila-list li:hover {
        opacity: 1;
    }

    footer .input-group-addon {
        background-color: #ffbf35;
        padding: 10px;
        border: none;
    }

    .f-address li {
        list-style: none;
    }

    .f-address li i {
        color: #2995de;
        font-size: 18px;
    }

    .f-address li a {
        color: #ccc;
    }

    /*=-Copyright-=*/
    .copyright {
        background-color: #111;
        padding: 12px 0;
        font-size: 14px;
    }
</style>