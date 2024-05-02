<!-- Este componente contiene la información de entrada y se encuentra dentro del componente EntryList -->
<template>
    <div 
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({name:'entry', params:{id:10}})"> <!--En este @click estamos usando el router para acceder a entry, y enviamos como parametro el id:10-->
    <!-- Title -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">02</span>
            <span class="mx-1 fs-5">05</span>
            <span class="mx-1 fw-light">2024, jueves</span>
        </div>
        <div class="entry-description">
            Qui dolor incididunt velit reprehenderit elit cillum deserunt magna occaecat sint pariatur deserunt officia. Deserunt veniam in est deserunt incididunt in tempor labore commodo cupidatat ullamco exercitation laboris adipisicing. Culpa reprehenderit excepteur laboris sit et irure in magna.
        </div>
    </div>
</template>


<style lang="scss" scoped>
.entry-container{
    border-bottom:1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover{ //Es lo mismo que poner .entry-container:hover{}, esto es porque se está usando scss
        background-color:lighten($color: grey, $amount: 45); //Esta función es también de sass, te permite aclarar un color por porcentajes
        transition: 0.2s all ease-in;
    }

    .entry-description{
        font-size:12px;
    }
}
</style>