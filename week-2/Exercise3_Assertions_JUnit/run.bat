@echo off
setlocal

:: Create lib directory if it doesn't exist
if not exist lib mkdir lib

:: Download JUnit 4 and Hamcrest Core if they don't exist
if not exist lib\junit-4.13.2.jar (
    echo Downloading junit-4.13.2.jar...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar' -OutFile 'lib\junit-4.13.2.jar'"
)

if not exist lib\hamcrest-core-1.3.jar (
    echo Downloading hamcrest-core-1.3.jar...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar' -OutFile 'lib\hamcrest-core-1.3.jar'"
)

:: Compile the test class
echo Compiling AssertionsTest.java...
javac -cp "lib\junit-4.13.2.jar;lib\hamcrest-core-1.3.jar" AssertionsTest.java
if %errorlevel% neq 0 (
    echo Compilation failed!
    exit /b %errorlevel%
)

:: Run the test class
echo Running JUnit tests...
java -cp ".;lib\junit-4.13.2.jar;lib\hamcrest-core-1.3.jar" org.junit.runner.JUnitCore AssertionsTest

endlocal
