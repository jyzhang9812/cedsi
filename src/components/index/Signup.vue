<template>
    <div class="signup">
        <center>
            <div class="zf-row zf-column  text-center">
                <h2>成为赛迪斯的一员</h2>
                <button ui-sref="join" class="button secondary large">
                    Sign up free
                </button>
            </div>
        </center>
    </div>
</template>

<script>
    export default {
        name: 'Signup',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body.site section {
        padding-bottom: 2rem;
        padding-top: 2rem;
    }

    .hp-control {
        padding-bottom: 4rem !important;
    }

    .hp-control {
        font-weight: 400;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
    }

    section {
        display: block;
    }

    .zf-row:after,
    .zf-row:before {
        display: table;
        content: " ";
    }

    *,
    :after,
    :before {
        box-sizing: inherit;
    }

    body.site h2 {
        padding-bottom: 20px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        color: #25293a;
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: Roboto Slab, Open Sans, Helvetica, Arial, sans-serif;
        line-height: 1.3;
        padding-bottom: 10px;
    }

    .button.secondary {
        background-color: #00bcd4;
        color: #fefefe;
    }

    .button.large {
        font-size: 1.1rem;
    }

    .button {
        font-weight: 600;
        text-transform: uppercase;
    }

    .button {
        display: inline-block;
        vertical-align: middle;
        margin: 0 0 1rem;
        font-family: inherit;
        padding: .85em 1em;
        -webkit-appearance: none;
        border: 1px solid transparent;
        border-radius: 5px;
        transition: background-color .25s ease-out, color .25s ease-out;
        font-size: .9rem;
        line-height: 1;
        text-align: center;
        cursor: pointer;
    }

    .zf-row:after {
        clear: both;
    }
</style>