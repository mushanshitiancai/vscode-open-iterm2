on run argv
	set prevDelimiter to AppleScript's text item delimiters
	set AppleScript's text item delimiters to " "
	set commands to argv as string
	set AppleScript's text item delimiters to prevDelimiter

	tell application "System Events" to set wasOpen to exists (processes where name is "iTerm2")
	
	if not wasOpen then
		tell application "iTerm"
			activate
			repeat until current window exists
				delay 0.1
			end repeat
		end tell
	end if
	
	tell application "iTerm"
		if wasOpen then
			tell current window
				create tab with default profile
			end tell
		end if
		tell current session of current tab of current window
			write text commands
		end tell
		activate
	end tell
end run
