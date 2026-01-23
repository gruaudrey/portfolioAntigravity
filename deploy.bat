@echo off
echo Deploiement vers GitHub...
git add .
git commit -m "Mise a jour du contenu depuis Admin Panel"
git push origin main
echo.
echo Deploiement termine ! Render va mettre a jour votre site dans quelques minutes.
pause
