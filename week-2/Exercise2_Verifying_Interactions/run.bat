@echo off
setlocal

:: Create lib directory if it doesn't exist
if not exist lib mkdir lib

:: Try to copy dependencies from Exercise 1 first to save download time
set "EX1_LIB=..\Exercise1_Mocking_Stubbing\lib"

if not exist lib\junit-platform-console-standalone-1.10.2.jar (
    if exist "%EX1_LIB%\junit-platform-console-standalone-1.10.2.jar" (
        echo Copying junit-platform-console-standalone-1.10.2.jar from Exercise 1...
        copy "%EX1_LIB%\junit-platform-console-standalone-1.10.2.jar" lib\ > nul
    ) else (
        echo Downloading junit-platform-console-standalone-1.10.2.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.10.2/junit-platform-console-standalone-1.10.2.jar' -OutFile 'lib\junit-platform-console-standalone-1.10.2.jar'"
    )
)

if not exist lib\mockito-core-4.11.0.jar (
    if exist "%EX1_LIB%\mockito-core-4.11.0.jar" (
        echo Copying mockito-core-4.11.0.jar from Exercise 1...
        copy "%EX1_LIB%\mockito-core-4.11.0.jar" lib\ > nul
    ) else (
        echo Downloading mockito-core-4.11.0.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/mockito/mockito-core/4.11.0/mockito-core-4.11.0.jar' -OutFile 'lib\mockito-core-4.11.0.jar'"
    )
)

if not exist lib\byte-buddy-1.12.22.jar (
    if exist "%EX1_LIB%\byte-buddy-1.12.22.jar" (
        echo Copying byte-buddy-1.12.22.jar from Exercise 1...
        copy "%EX1_LIB%\byte-buddy-1.12.22.jar" lib\ > nul
    ) else (
        echo Downloading byte-buddy-1.12.22.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/net/bytebuddy/byte-buddy/1.12.22/byte-buddy-1.12.22.jar' -OutFile 'lib\byte-buddy-1.12.22.jar'"
    )
)

if not exist lib\byte-buddy-agent-1.12.22.jar (
    if exist "%EX1_LIB%\byte-buddy-agent-1.12.22.jar" (
        echo Copying byte-buddy-agent-1.12.22.jar from Exercise 1...
        copy "%EX1_LIB%\byte-buddy-agent-1.12.22.jar" lib\ > nul
    ) else (
        echo Downloading byte-buddy-agent-1.12.22.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/net/bytebuddy/byte-buddy-agent/1.12.22/byte-buddy-agent-1.12.22.jar' -OutFile 'lib\byte-buddy-agent-1.12.22.jar'"
    )
)

if not exist lib\objenesis-3.3.jar (
    if exist "%EX1_LIB%\objenesis-3.3.jar" (
        echo Copying objenesis-3.3.jar from Exercise 1...
        copy "%EX1_LIB%\objenesis-3.3.jar" lib\ > nul
    ) else (
        echo Downloading objenesis-3.3.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/objenesis/objenesis/3.3/objenesis-3.3.jar' -OutFile 'lib\objenesis-3.3.jar'"
    )
)

:: Compile the classes
echo Compiling Java classes...
javac -cp "lib\junit-platform-console-standalone-1.10.2.jar;lib\mockito-core-4.11.0.jar;lib\byte-buddy-1.12.22.jar;lib\byte-buddy-agent-1.12.22.jar;lib\objenesis-3.3.jar" ExternalApi.java MyService.java MyServiceTest.java
if %errorlevel% neq 0 (
    echo Compilation failed!
    exit /b %errorlevel%
)

:: Run the test class
echo Running JUnit 5 tests...
java -jar lib\junit-platform-console-standalone-1.10.2.jar --class-path ".;lib\mockito-core-4.11.0.jar;lib\byte-buddy-1.12.22.jar;lib\byte-buddy-agent-1.12.22.jar;lib\objenesis-3.3.jar" --select-class MyServiceTest

endlocal
