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
           FOTO

           No usamos decode().
           No esperamos nada.
           Apenas dispara LOAD se muestra.
        ====================================================== */

        function showPhoto() {


            if (
                !mainPhoto
            ) {

                return;

            }


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


        }



        if (
            mainPhoto
        ) {


            if (
                mainPhoto.complete &&
                mainPhoto.naturalWidth > 0
            ) {


                showPhoto();


            } else {


                mainPhoto.addEventListener(
                    "load",
                    showPhoto,
                    {
                        once: true
                    }
                );


            }


        }



        /* =====================================================
           PREPARACIÓN INTELIGENTE DE AUDIO

           Esperamos solamente 300 ms.

           Esto permite que la portada se pinte primero.

           Después el navegador puede empezar a almacenar
           la canción antes de que el usuario toque el botón.
        ====================================================== */

        if (
            audio
        ) {


            audio.volume =
                0.5;


            window.setTimeout(
                () => {


                    audio.preload =
                        "auto";


                    audio.load();


                },
                300
            );


        }



        /* =====================================================
           UI MÚSICA
        ====================================================== */

        function syncMusicUI() {


            if (
                !audio
            ) {

                return;

            }


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


            if (
                !audio
            ) {

                return;

            }


            try {


                await audio.play();


            } catch (
                error
            ) {


                console.info(
                    "El navegador requiere interacción adicional para reproducir el audio."
                );


            }


            syncMusicUI();


        }



        function pauseMusic() {


            if (
                !audio
            ) {

                return;

            }


            audio.pause();


            syncMusicUI();


        }



        async function toggleMusic() {


            if (
                !audio
            ) {

                return;

            }


            if (
                audio.paused
            ) {


                await playMusic();


            } else {


                pauseMusic();


            }


        }



        musicControls.forEach(

            button => {


                button.addEventListener(
                    "click",
                    toggleMusic
                );


            }

        );



        if (
            audio
        ) {


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


        }



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


                if (
                    countdown
                ) {

                    countdown.hidden =
                        true;

                }


                if (
                    countdownTitle
                ) {

                    countdownTitle.hidden =
                        true;

                }


                if (
                    eventMessage
                ) {

                    eventMessage.hidden =
                        false;

                }


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



            if (
                daysElement
            ) {

                daysElement.textContent =
                    pad(days);

            }


            if (
                hoursElement
            ) {

                hoursElement.textContent =
                    pad(hours);

            }


            if (
                minutesElement
            ) {

                minutesElement.textContent =
                    pad(minutes);

            }


            if (
                secondsElement
            ) {

                secondsElement.textContent =
                    pad(seconds);

            }


        }



        updateCountdown();



        window.setInterval(
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
                        threshold: .08
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