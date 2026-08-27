document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           ELEMENTOS
        ====================================================== */

        const audio =
            document.getElementById(
                "bgMusic"
            );


        const openingScreen =
            document.getElementById(
                "openingScreen"
            );


        const openInvitation =
            document.getElementById(
                "openInvitation"
            );


        const openingStatus =
            document.getElementById(
                "openingStatus"
            );


        const musicButton =
            document.getElementById(
                "musicButton"
            );


        const musicBottomButton =
            document.getElementById(
                "musicBottomButton"
            );


        const soundWave =
            document.getElementById(
                "soundWave"
            );


        const mainPhoto =
            document.getElementById(
                "mainPhoto"
            );


        const photoPlaceholder =
            document.getElementById(
                "photoPlaceholder"
            );


        const musicControls = [
            musicButton,
            musicBottomButton
        ].filter(Boolean);



        /* =====================================================
           ESTADO
        ====================================================== */

        let photoReady = false;

        let audioReady = false;

        let resourcesStarted = false;



        function updateOpeningStatus() {


            if (
                photoReady &&
                audioReady
            ) {

                openingStatus.textContent =
                    "Todo listo para abrir nuestra invitación";

                return;

            }


            if (
                photoReady
            ) {

                openingStatus.textContent =
                    "Preparando nuestra canción…";

                return;

            }


            if (
                audioReady
            ) {

                openingStatus.textContent =
                    "Preparando nuestra fotografía…";

                return;

            }


            openingStatus.textContent =
                "Preparando nuestra celebración…";

        }



        /* =====================================================
           FOTO

           IMPORTANTE:

           NO usamos image.decode().

           En algunos teléfonos, especialmente con imágenes
           WebP de dimensiones muy grandes, decode() puede
           añadir segundos de espera.

           Apenas termina el evento LOAD se muestra.
        ====================================================== */

        function markPhotoReady() {


            if (
                photoReady
            ) {
                return;
            }


            photoReady = true;


            mainPhoto.classList.add(
                "is-loaded"
            );


            if (
                photoPlaceholder
            ) {

                photoPlaceholder.classList.add(
                    "is-hidden"
                );

            }


            updateOpeningStatus();

        }



        mainPhoto.addEventListener(
            "load",
            markPhotoReady,
            {
                once: true
            }
        );



        mainPhoto.addEventListener(
            "error",
            () => {

                console.error(
                    "No fue posible cargar la fotografía principal."
                );

                openingStatus.textContent =
                    "Abre la invitación mientras preparamos la fotografía";

            },
            {
                once: true
            }
        );



        /* =====================================================
           AUDIO
        ====================================================== */

        audio.volume = 0.5;



        function markAudioReady() {


            if (
                audioReady
            ) {
                return;
            }


            audioReady = true;


            updateOpeningStatus();

        }



        audio.addEventListener(
            "canplay",
            markAudioReady,
            {
                once: true
            }
        );



        audio.addEventListener(
            "error",
            () => {

                console.error(
                    "No fue posible preparar el audio."
                );

            }
        );



        /* =====================================================
           INICIO INTELIGENTE DE RECURSOS PESADOS

           Esperamos DOS frames.

           Esto permite que el navegador pinte primero
           la pantalla de apertura.

           Inmediatamente después empiezan FOTO + AUDIO
           prácticamente al mismo tiempo.
        ====================================================== */

        function startCriticalResources() {


            if (
                resourcesStarted
            ) {
                return;
            }


            resourcesStarted = true;



            /*
                FOTO
            */

            if (
                !mainPhoto.src
            ) {

                mainPhoto.src =
                    mainPhoto.dataset.src;

            }



            /*
                AUDIO
            */

            if (
                !audio.src
            ) {

                audio.src =
                    audio.dataset.src;


                audio.load();

            }


        }



        requestAnimationFrame(
            () => {


                requestAnimationFrame(
                    () => {


                        startCriticalResources();


                    }
                );


            }
        );



        /* =====================================================
           UI MÚSICA
        ====================================================== */

        function syncMusicUI() {


            const playing =
                !audio.paused &&
                !audio.ended;



            musicControls.forEach(
                button => {


                    button.classList.toggle(
                        "is-playing",
                        playing
                    );


                    button.setAttribute(
                        "aria-pressed",
                        String(
                            playing
                        )
                    );


                    button.setAttribute(
                        "aria-label",
                        playing
                            ? "Pausar música"
                            : "Reproducir música"
                    );


                }
            );



            if (
                soundWave
            ) {

                soundWave.classList.toggle(
                    "is-playing",
                    playing
                );

            }


        }



        async function playMusic() {


            /*
                Garantizamos que el audio ya tenga SRC.
            */

            startCriticalResources();



            try {


                await audio.play();


            } catch (
                error
            ) {


                console.info(
                    "El navegador necesita otra interacción para reproducir el audio."
                );


            }


            syncMusicUI();

        }



        function pauseMusic() {


            audio.pause();


            syncMusicUI();

        }



        async function toggleMusic() {


            if (
                audio.paused
            ) {

                await playMusic();

            } else {

                pauseMusic();

            }

        }



        /* =====================================================
           ABRIR INVITACIÓN
        ====================================================== */

        openInvitation.addEventListener(
            "click",
            () => {


                /*
                    NO esperamos imagen.

                    NO esperamos audio.

                    La invitación abre inmediatamente.
                */

                openingScreen.classList.add(
                    "is-hidden"
                );


                document.body.classList.remove(
                    "is-locked"
                );



                /*
                    El click cuenta como gesto del usuario,
                    por lo que intentamos reproducir.
                */

                playMusic();


            }
        );



        /* =====================================================
           BOTONES DE MÚSICA
        ====================================================== */

        musicControls.forEach(
            button => {


                button.addEventListener(
                    "click",
                    toggleMusic
                );


            }
        );


        audio.addEventListener(
            "play",
            syncMusicUI
        );


        audio.addEventListener(
            "pause",
            syncMusicUI
        );


        audio.addEventListener(
            "ended",
            syncMusicUI
        );



        /* =====================================================
           CUENTA REGRESIVA
        ====================================================== */

        const targetDate =
            new Date(
                2026,
                9,
                17,
                17,
                0,
                0
            ).getTime();



        const daysElement =
            document.getElementById(
                "days"
            );


        const hoursElement =
            document.getElementById(
                "hours"
            );


        const minutesElement =
            document.getElementById(
                "minutes"
            );


        const secondsElement =
            document.getElementById(
                "seconds"
            );


        const countdown =
            document.getElementById(
                "countdown"
            );


        const countdownTitle =
            document.getElementById(
                "countdownTitle"
            );


        const eventMessage =
            document.getElementById(
                "eventMessage"
            );



        function pad(
            number
        ) {


            return String(
                number
            ).padStart(
                2,
                "0"
            );


        }



        function updateCountdown() {


            const difference =
                targetDate -
                Date.now();



            if (
                difference <= 0
            ) {


                countdown.hidden = true;


                countdownTitle.hidden = true;


                eventMessage.hidden = false;


                return;


            }



            const second = 1000;

            const minute =
                second * 60;

            const hour =
                minute * 60;

            const day =
                hour * 24;



            const days =
                Math.floor(
                    difference /
                    day
                );



            const hours =
                Math.floor(
                    (
                        difference %
                        day
                    )
                    /
                    hour
                );



            const minutes =
                Math.floor(
                    (
                        difference %
                        hour
                    )
                    /
                    minute
                );



            const seconds =
                Math.floor(
                    (
                        difference %
                        minute
                    )
                    /
                    second
                );



            daysElement.textContent =
                pad(days);


            hoursElement.textContent =
                pad(hours);


            minutesElement.textContent =
                pad(minutes);


            secondsElement.textContent =
                pad(seconds);


        }



        updateCountdown();



        setInterval(
            updateCountdown,
            1000
        );



        /* =====================================================
           REVEAL
        ====================================================== */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );



        if (
            "IntersectionObserver"
            in window
        ) {


            const observer =
                new IntersectionObserver(
                    entries => {


                        entries.forEach(
                            entry => {


                                if (
                                    entry.isIntersecting
                                ) {


                                    entry.target.classList.add(
                                        "is-visible"
                                    );


                                    observer.unobserve(
                                        entry.target
                                    );


                                }


                            }
                        );


                    },
                    {
                        threshold: .10
                    }
                );



            revealElements.forEach(
                element => {


                    observer.observe(
                        element
                    );


                }
            );


        } else {


            revealElements.forEach(
                element => {


                    element.classList.add(
                        "is-visible"
                    );


                }
            );


        }


    }
);