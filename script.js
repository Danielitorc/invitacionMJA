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


        const musicControls = [

            musicButton,
            musicBottomButton

        ].filter(Boolean);



        /* =====================================================
           AUDIO

           Ya está siendo precargado desde HEAD.
        ====================================================== */

        audio.volume =
            0.5;



        /*
           Fuerza al navegador a preparar el recurso
           inmediatamente.

           Como pesa ~768 KB esto es totalmente razonable.
        */

        audio.load();



        /*
           Indicador interno de preparación.
        */

        function updateAudioStatus() {


            /*
               HAVE_FUTURE_DATA = 3
               HAVE_ENOUGH_DATA = 4
            */

            if (
                audio.readyState >= 3
            ) {


                if (
                    openingStatus
                ) {

                    openingStatus.textContent =
                        "La música está lista para acompañarte";

                }


            } else {


                if (
                    openingStatus
                ) {

                    openingStatus.textContent =
                        "Preparando nuestra canción…";

                }


            }


        }



        audio.addEventListener(
            "loadeddata",
            updateAudioStatus
        );


        audio.addEventListener(
            "canplay",
            updateAudioStatus
        );


        audio.addEventListener(
            "canplaythrough",
            updateAudioStatus
        );


        updateAudioStatus();



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
                        String(playing)
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


            try {


                await audio.play();


            } catch (
                error
            ) {


                console.info(
                    "El navegador necesita interacción adicional para iniciar el audio."
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
            async () => {


                /*
                   Primero intentamos iniciar música
                   DENTRO del gesto de usuario.
                */

                await playMusic();



                /*
                   Después abrimos la invitación.
                */

                openingScreen.classList.add(
                    "is-hidden"
                );


                document.body.classList.remove(
                    "is-locked"
                );


            }
        );



        /* =====================================================
           BOTONES AUDIO
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


                countdown.hidden =
                    true;


                countdownTitle.hidden =
                    true;


                eventMessage.hidden =
                    false;


                return;


            }



            const second =
                1000;


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
           SCROLL REVEAL
        ====================================================== */

        const revealElements =

            document.querySelectorAll(
                ".reveal"
            );



        if (
            "IntersectionObserver"
            in
            window
        ) {


            const observer =

                new IntersectionObserver(

                    entries => {


                        entries.forEach(

                            entry => {


                                if (
                                    entry.isIntersecting
                                ) {


                                    entry.target
                                        .classList
                                        .add(
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
                        threshold:
                            0.10
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