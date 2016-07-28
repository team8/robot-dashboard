package com.palyrobotics.robot;

import com.palyrobotics.subsystem.accumulator.AccumulatorController;
import com.palyrobotics.subsystem.breacher.BreacherController;
import com.palyrobotics.subsystem.drivetrain.DrivetrainController;
import com.palyrobotics.subsystem.grabber.GrabberController;
import com.palyrobotics.subsystem.shooter.ShooterController;

import edu.wpi.first.wpilibj.DriverStation;
import edu.wpi.first.wpilibj.networktables.NetworkTable;

public class Dashboard {
	private NetworkTable table;
	private DriverStation ds;
	private boolean checkingAlliance;
	private AccumulatorController accumulator;
	private DrivetrainController drivetrain;
	private ShooterController shooter;
	private BreacherController breacher;
	private GrabberController grabber;

	public Dashboard(DriverStation driverstation, AccumulatorController accumulator, DrivetrainController drivetrain,
			ShooterController shooter, BreacherController breacher, GrabberController grabber) {
		table = NetworkTable.getTable("RobotTable");
		this.ds = driverstation;
		this.accumulator = accumulator;
		this.drivetrain = drivetrain;
		this.shooter = shooter;
		this.breacher = breacher;
		this.grabber = grabber;
		this.checkingAlliance = true;
	}

	/**
	 * Put the default values into the dashboard
	 */
	public void initDashboard() {
		table.putNumber("match-time", 90);
		table.putString("game-period", "DISABLED");
		table.putBoolean("brownout-status", false);
		table.putNumber("battery", 12.0);
		table.putString("alliance", "invalid");
		table.putString("accumulatorstate", "Disabled");
		table.putString("drivetrainstate", "Disabled");
		table.putString("shooterstate", "Disabled");
		table.putString("breacherstate", "Disabled");
		table.putString("grabberstate", "Disabled");

	}

	/**
	 * Update a specific key on the NetworkTables
	 * 
	 * @param key to update
	 * @param doubleValue
	 * @param stringValue
	 * @param booleanValue
	 * @param type double, string, or boolean
	 */
	public void updateKey(String key, double doubleValue, String stringValue, boolean booleanValue, String type) {
		switch (type) {
		case "string":
			table.putString(key, stringValue);
			break;
		case "double":
			table.putNumber(key, doubleValue);
			break;
		case "boolean":
			table.putBoolean(key, booleanValue);
		}
	}

	/**
	 * Update the values of the dashboard
	 */
	public void updateDashboard() {
		if (checkingAlliance) {
			switch (ds.getAlliance()) {
			case Blue:
				table.putString("alliance", "blue");
				checkingAlliance = false;
				break;
			case Red:
				table.putString("alliance", "red");
				checkingAlliance = false;
				break;
			case Invalid:
				table.putString("alliance", "invalid");
			}
		}

		table.putNumber("match-time", ds.getMatchTime());
		table.putBoolean("brownout-status", ds.isBrownedOut());
		table.putNumber("battery", ds.getBatteryVoltage());
		if (ds.isAutonomous()) {
			table.putString("game-period", "Autonomous");
		} else if (ds.isDisabled()) {
			table.putString("game-period", "Disabled");
		} else if (ds.isOperatorControl()) {
			table.putString("game-period", "TeleOperated");
		} else if (ds.isTest()) {
			table.putString("game-period", "Test");
		} else {
			table.putString("game-period", "Unidentified");
		}
		
		updateAccumulatorState();
		updateDrivetrainState();
		updateShooterState();
		updateBreacherMacroState();
		updateBreacherMicroState();
		updateGrabberMacroState();
		updateGrabberMicroState();

	}

	/**
	 * Update accumulator state
	 */
	public void updateAccumulatorState() {
		switch (accumulator.getState()) {
		case IDLE:
			table.putString("accumulatorstate", "Idle");
			break;
		case ACCUMULATING:
			table.putString("accumulatorstate", "Accumulating");
			break;
		case EJECTING:
			table.putString("accumulatorstate", "Ejecting");
			break;
		case HOLDING:
			table.putString("accumulatorstate", "Holding");
			break;
		case RELEASING:
			table.putString("accumulatorstate", "Releasing");
		}
	}

	/**
	 * Update drivetrain state
	 */
	public void updateDrivetrainState() {
		switch (drivetrain.getDrivetrainState()) {
		case IDLE:
			table.putString("drivetrainstate", "Idle");
			break;
		case DRIVING_TELEOP:
			table.putString("drivetrainstaet", "Driving Teleop");
			break;
		case DRIVING_DISTANCE:
			table.putString("drivetrainstate", "Driving Distance");
			break;
		case TURNING_ANGLE:
			table.putString("drivetrainstate", "Turning angle");
			break;
		case ALIGN_TO_GOAL:
			table.putString("drivetrainstate", "Align to goal");
			break;
		case DISABLED:
			table.putString("drivetrainstate", "Disabled");
		}
	}

	/**
	 * Update shooter state
	 */
	public void updateShooterState() {
		switch (shooter.getState()) {
		case IDLE:
			table.putString("shooterstate", "Idle");
			break;
		case TELEOP:
			table.putString("shooterstate", "Teleop");
			break;
		case FIRE:
			table.putString("shooterstate", "Fire");
			break;
		case LOAD:
			table.putString("shooterstate", "Load");
			break;
		case HOLD:
			table.putString("shooterstate", "Hold");
			break;
		case DISABLED:
			table.putString("shooterstate", "Disabled");
		}
	}

	/**
	 * Update breacher macro state
	 */
	public void updateBreacherMacroState() {
		switch (breacher.getMacroState()) {
		case TELEOP:
			table.putString("breachermacrostate", "Teleop");
			break;
		case AUTO:
			table.putString("breachermacrostate", "Auto");
			break;
		case DISABLED:
			table.putString("breachermacrostate", "Disabled");
			break;
		}
	}

	/**
	 * Update breacher micro state
	 */
	public void updateBreacherMicroState() {
		switch (breacher.getMicroState()) {
		case BOUNCING:
			table.putString("breachermicrostate", "Bouncing");
			break;
		case IDLE:
			table.putString("breachermicrostate", "Idle");
			break;
		case OPENING:
			table.putString("breachermicrostate", "Opening");
			break;
		case CLOSING:
			table.putString("breachermicrostate", "Closing");
			break;
		case SETTING_ANGLE:
			table.putString("breachermicrostate", "Setting angle");
			break;
		case JOYSTICK_CONTROL:
			table.putString("breachermicrostate", "Joystick Control");
		}
	}

	/**
	 * Update grabber macro state
	 */
	public void updateGrabberMacroState() {
		switch (grabber.getGrabberState()) {
		case IDLE:
			table.putString("grabbermacrostate", "Idle");
			break;
		case TELEOP:
			table.putString("grabbermacrostate", "Teleop");
			break;
		}
	}

	/**
	 * Update grabber micro state
	 */
	public void updateGrabberMicroState() {
		switch (grabber.getMicroGrabberState()) {
		case RAISED:
			table.putString("grabbermicrostate", "Raised");
			break;
		case LOWERED:
			table.putString("grabbermicrostate", "Lowered");
			break;
		}
	}

}
