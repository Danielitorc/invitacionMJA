document.addEventListener(
    "DOMContentLoaded",
    () => {

        const audio =
            document.getElementById("bgMusic");

        const openingScreen =
            document.getElementById("openingScreen");

        const openInvitation =
            document.getElementById("openInvitation");

        const musicButton =
            document.getElementById("musicButton");

        const musicBottomButton =
            document.getElementById("musicBottomButton");

        const soundWave =
            document.getElementById("soundWave");

        const musicControls = [
            musicButton,
            musicBottomButton
        ].filter(Boolean);


        /* =====================================================
           AUDIO
        ====================================================== */

        audio.volume = 0.5;

        /* 
           Precarga inteligente del audio:
           Primero dejamos que cargue la interfaz y la foto.
           Después iniciamos la preparación del audio.
        */
        window.addEventListener(
            "load",
            () => {
                setTimeout(
                    () => {
                        audio.preload = "auto";
                        audio.load();
                    },
                    700
                );
            }
        );


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

            if (soundWave) {
                soundWave.classList.toggle(
                    "is-playing",
                    playing
                );
            }
        }


        async function playMusic() {
            try {
                await audio.play();
            } catch (error) {
                console.info(
                    "El navegador requiere interacción del usuario para reproducir música."
                );
            }

            syncMusicUI();
        }


        function pauseMusic() {
            audio.pause();
            syncMusicUI();
        }


        async function toggleMusic() {
            if (audio.paused) {
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
                openingScreen.classList.add("is-hidden");
                document.body.classList.remove("is-locked");
                await playMusic();
            }
        );


        /* =====================================================
           BOTONES MÚSICA
        ====================================================== */

        musicControls.forEach(
            button => {
                button.addEventListener(
                    "click",
                    toggleMusic
                );
            }
        );

        audio.addEventListener("play", syncMusicUI);
        audio.addEventListener("pause", syncMusicUI);
        audio.addEventListener("ended", syncMusicUI);


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
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");

        const countdown =
            document.getElementById("countdown");

        const countdownTitle =
            document.getElementById("countdownTitle");

        const eventMessage =
            document.getElementById("eventMessage");


        function pad(number) {
            return String(number).padStart(2, "0");
        }


        function updateCountdown() {

            const now = Date.now();
            const difference = targetDate - now;

            if (difference <= 0) {
                countdown.hidden = true;
                countdownTitle.hidden = true;
                eventMessage.hidden = false;
                return;
            }

            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const days = Math.floor(difference / day);
            const hours = Math.floor((difference % day) / hour);
            const minutes = Math.floor((difference % hour) / minute);
            const seconds = Math.floor((difference % minute) / second);

            daysElement.textContent = pad(days);
            hoursElement.textContent = pad(hours);
            minutesElement.textContent = pad(minutes);
            secondsElement.textContent = pad(seconds);
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);


        /* =====================================================
           REVEAL
        ====================================================== */

        const elementsToReveal =
            document.querySelectorAll(".reveal");

        if ("IntersectionObserver" in window) {

            const observer =
                new IntersectionObserver(
                    entries => {
                        entries.forEach(
                            entry => {
                                if (entry.isIntersecting) {
                                    entry.target.classList.add("is-visible");
                                    observer.unobserve(entry.target);
                                }
                            }
                        );
                    },
                    {
                        threshold: 0.10
                    }
                );

            elementsToReveal.forEach(
                element => {
                    observer.observe(element);
                }
            );

        } else {
            elementsToReveal.forEach(
                element => {
                    element.classList.add("is-visible");
                }
            );
        }

    }
);