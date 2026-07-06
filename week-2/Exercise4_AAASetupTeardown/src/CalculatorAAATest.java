import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class CalculatorAAATest {

	Calculator calculator;

	@Before
	public void setUp() {
		calculator = new Calculator();
		System.out.println("Setup Executed");
	}

	@Test
	public void testAddition() {

		// Arrange
		int a = 10;
		int b = 20;

		// Act
		int result = calculator.add(a, b);

		// Assert
		assertEquals(30, result);
	}

	@After
	public void tearDown() {
		calculator = null;
		System.out.println("Teardown Executed");
	}
}