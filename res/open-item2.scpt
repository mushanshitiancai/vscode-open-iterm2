on run argv
	set prevDelimiter to AppleScript's text item delimiters
	
	set AppleScript's text item delimiters to " "
	set commands to argv as string
	set AppleScript's text item delimiters to prevDelimiter
	
	tell application "iTerm"
		tell current session of current tab of current window
			write text commands
		end tell
	end tell
end run
