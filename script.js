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
           ESTADO DE CARGA
        ====================================================== */

        let photoReady = false;
        let audioReady = false;



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
           FOTO PRINCIPAL
        ====================================================== */

        function showMainPhoto() {


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



        if (
            mainPhoto.complete &&
            mainPhoto.naturalWidth > 0
        ) {


            mainPhoto
                .decode()
                .catch(
                    () => {}
                )
                .finally(
                    showMainPhoto
                );


        } else {


            mainPhoto.addEventListener(
                "load",
                async () => {


                    try {

                        await mainPhoto.decode();

                    } catch (
                        error
                    ) {

                        /*
                            La imagen se muestra igualmente
                            aunque decode() falle.
                        */

                    }


                    showMainPhoto();


                },
                {
                    once: true
                }
            );


        }



        /* =====================================================
           AUDIO
        ====================================================== */

        audio.volume = 0.5;



        function markAudioReady() {


            audioReady = true;


            updateOpeningStatus();

        }



        if (
            audio.readyState >=
            HTMLMediaElement.HAVE_FUTURE_DATA
        ) {


            markAudioReady();


        } else {


            audio.addEventListener(
                "canplay",
                markAudioReady,
                {
                    once: true
                }
            );


        }



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
                    Se solicita la reproducción dentro
                    del gesto del usuario.
                */

                playMusic();


                openingScreen.classList.add(
                    "is-hidden"
                );


                document.body.classList.remove(
                    "is-locked"
                );


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
           17 OCTUBRE 2026
           5:00 PM
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
           ANIMACIONES
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