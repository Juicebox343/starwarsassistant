CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) UNIQUE,
	first_name VARCHAR(50),
	password VARCHAR(255)
);

CREATE TABLE characters(
	id INT AUTO_INCREMENT PRIMARY KEY,
	avatar VARCHAR(255),
	nickname VARCHAR(50),
	first_name VARCHAR(50),
	family_name VARCHAR(50),
	holonet_id VARCHAR(20),
	owning_user INT,
	FOREIGN KEY (owning_user) REFERENCES users(id)
);

CREATE TABLE messages(
	id INT AUTO_INCREMENT PRIMARY KEY,
	fromChar INT,
	toChar INT,
	childID INT NULL,
	parentID INT NULL,
	created_at DATETIME,
	content VARCHAR(3000),
	subject VARCHAR(255),
	message_read BIT DEFAULT 0,
	FOREIGN KEY (fromChar) REFERENCES characters(id),
	FOREIGN KEY (toChar) REFERENCES characters(id)
);


#From
SELECT characters.first_name AS "From", messages.subject AS "Subject", c.first_name AS "To" FROM characters LEFT JOIN messages ON characters.id = messages.fromChar LEFT JOIN characters AS c ON c.id = messages.toChar WHERE messages.toChar = 2;

#To
SELECT characters.first_name AS "To", messages.subject AS "Subject", c.first_name AS "From" FROM characters LEFT JOIN messages ON characters.id = messages.toChar LEFT JOIN characters AS c ON c.id = messages.fromChar WHERE messages.fromChar = 1;

INSERT INTO characters(
first_name,
family_name,
holonet_id,
owning_user
) VALUES
(
"Saskia",
NULL,
"1D2A21/2",
"1"
),(
"Szoran",
"Val",
"3C4Q41/7",
"2"
),(
"Auzel",
"Pedaf",
"8T3B44/2",
"3"
),(
"Anhir",
"Eth Fiad'hur",
"8C2U69/5",
"4"
),(
"Nabrina",
"Fenn",
"4O5E49/1",
"5"
),(
"C7M29",
NULL,
"4O5E49/1",
"6"
),(
"Belgard",
NULL,
"3Y3G69/5",
"1"
),(
"Bel",
"Finn",
"5Q3I22/3",
"1"
),(
"Prax",
"Du",
"9I1C53/7",
"1"
),(
"Petri",
NULL,
"7Y1B31/4",
"1"
),(
"Sam",
NULL,
"6C1B11/7",
"1"
),(
"Kavran",
NULL,
"8L2M78/6",
"1"
),(
"Robaak",
NULL,
"9I1C53/7",
"1"
),(
"Aeron",
"Kron",
"1V8M55/9",
"1"
),(
"Asha",
"Kety",
"4H2D64/8",
"1"
),(
"Priat",
"Cole",
"1J2D64/9",
"1"
),(
"Toveri",
NULL,
"2K3E75/0",
"1"	
),(
"Lars",
"Reston",
"3L4F86/1",
"1"	
),(
"Tal'heso",
NULL,
"4M5N97/2",
"1"	
),(
"Franklin",
NULL,
"5N6D64/3",
"1"
),(
"Uncle",
"Pedaf",
"7N6E25/4",
"1"
),(
"Mom",
"Fiad'hur",
"8O8F36/5",
"1"	
),(
"Dad",
"Fiad'hur",
"9P8F37/6",
"1"	
),(
"The Family",
NULL,
"1Q9G48/7",
"1"
),(
"Kobra",
"Alde",
"2R0H59/8",
"1"
),(
"Dan",
"Daniel",
"3S1I61/9",
"1"
),(
"Ten",
NULL,
"4T2J72/1",
"1"	
),(
"Mina",
"Rastee",
"5U3K83/2",
"1"
),(
"Lorris",
"Culu",
"6V4L94/2",
"1"	
);
	

INSERT INTO messages(
fromChar,
toChar,
content,
subject
) VALUES (
"1",
"2",
"Szoran.<br><br>This is an automated message hardcoded into a local relay system to send in the event I did not deactivate it in time. I will not mince words with you. If you don’t already know, reading this means I have fallen in my service against the dark forces at work in our galaxy.<br><br>First I must apologize for not involving you initially, but there are some things a Master must keep from their Padawan. You and I share an affinity for The Hunt, trust that I wouldn’t deprive you of that without good reason.<br><br>I have made my way to Taris. I was about to land on the surface but I’ve had the sudden feeling that I should write you, explaining all that has lead me here. I will do as the Force wills.<br><br>Several years ago I was approached in secret by a colleague at the Jedi Temple on Coruscant. What he said felt utterly impossible to me at the time, but his persistence eventually wore me down. He claimed to sense a darkness within the Jedi Temple, an ancient and powerful vergence of the Dark Side under the very seats of the High Council.<br><br>Once brought to my attention I began to feel it as well. Through intensive scouring of the archives and some selective aggressive remodeling of the Temple’s lower levels, we found the source. It was exactly as we feared. When our findings were reported we were met with dismissal and hostility by certain leaders within the Council.<br><br>Szoran. We discovered an ancient Sith Temple resting deep in the heart of the mountain the Jedi Temple now sits upon.<br><br>I’m afraid I cannot say more in this message. The information here could be damning enough in the wrong hands. If you are in fact the one who receives this message, tune your comms to 332.33.775.2/1. Send a single word. The most important word we found in adapting Jedi training to your needs.<br><br>Goodbye<br>",
"AUTOMATED_MESSAGE"
);
	
	
CREATE TABLE news(
	id INT AUTO_INCREMENT PRIMARY KEY,
	author VARCHAR(255),
	article VARCHAR(3000)
);

INSERT INTO news(
author,
article
) VALUES (
"Aeron Kron",
"<h3>The LowerCity Cable</h3><p>Update: 13:45 - Governor of Sector 117, J’ael Martin, has announced taking special interest in this case specifying that her response will be detailed by the next rotation.<br><br>Original article: At approximately 11:30 hours this morning the body of CCP detective Elizabeth Kale was discovered on level 7, one of the lowest habitable levels of the undercity, by demolition and zone recovery crews. <br><br>Preliminary medical examination suggests she fell a great height, dying on impact. The detective’s death roughly coincides with calls received by the CCP detailing an altercation occuring on a departure platform in Level 15’s Wrexham Industrial District within Sector 117. <br><br>This is the third recorded death of a CCP officer in this sector this cycle. The other two were treated as homicides, though no official statement has been made regarding responsibility.<br><br>Homicide detectives are currently investigating.</p>"
),
(
"Aeron Kron",
"<h3>The LowerCity Cable</h3><p>Major announcement from Governor J’ael Martin today.<br><br>'The chaos wrought in our Lower City can be directly attributed to ineffective leadership within the CCP itself. As such, as Governor of Sector 117, I have removed our regional Director of the CCP and found a replacement that promises a firmer hand. Captain Bandu Orlean, a former officer with the Republic Navy, has all but guaranteed me results on Coruscant’s lower levels as he implements his new deployment of Droid only police officer attachments. We shall quell the unrest, and hold the responsible parties in contempt.'</p>"
),
(
"Aeron Kron",
"<h3>The LowerCity Cable</h3><p>Captain Bandu Orlean, recently selectected replacement head of the CCP by Sector 117’s governor, J’ael Martin, has made some controversial changes to the CCP workforce. 'Whether they’re humans, Twi’leks, Bith, whatever.. Organic creatures are susceptible to corruption and intimidation. What the lower levels need is a firm hand, and nothing is quite as firm as steel. That’s why I have decided to replace all CCP officers with highly capable enforcement droids.'<br><br>Created specifically for this task, Captain Orlean believes a single droid can do the job of several officers.<br><br> Neither the governor nor Captain Orlean provided comment on where the now jobless CCP officers were to go.</p>"
),
(
"Aeron Kron",
"<h3>The LowerCity Cable</h3><p>Aggression among the lower city gangs has hit a tipping point. Captain Orlean’s new all droid force has clashed with members of the once docile Movement. Some readers may be familiar with the Movement as a galaxy wide humanitarian organization, but recent weeks would suggest that there has been some measure of combat training among some members.<br><br>A major leader in the Movement, Tobin Sancuun, was recently incarcerated within the Jedi Temple on suspicions of Sith connections. Mr. Sancuun’s second, a droid designated L-14R, assumed control of Coruscant’s chapter and began the swift action we’ve seen of late.</p>
"
),
(
"Aeron Kron",
"<h3>The LowerCity Cable</h3><p>The lower levels of Coruscant continue to burn as week two of hostilities continue. The Governor for Sector 117 has declared a state of emergency and has begun soliciting local 
Senators for additional resources.<br><br>Rumor has it that defacto Movement Leader L-14R has fled Coruscant for unknown reasons.<br><br>Captured Movement aggressors have implied there exists higher leadership beyond Tobin Sancuun, whether L-14R has been in contact with this individual is unknown at this time.</p>"
),
(
"Aeron Kron",
"<h3>The LowerCity Cable</h3><p>The fires are beginning to die down on Coruscant’s lower levels, though skirmishes between CCPD and local gangs continue to put residents at risk.<br><br>A newcomer to the Lower Levels, an organization that refers to itself as The Coop, has made waves after a dramatic unveiling several weeks ago.<br><br>The Coop and its leadership have opened their doors to all displaced citizens, offering food and shelter on a first come first served basis.<br><br>Coop official, Prax Du, had this to say:<br><br>'I - We just want to help as best we can. There are no strings attached, no membership, no costs or service agreements. If you need help, come to the Coop and we’ll look after you.'<br><br>Mr. Du declined to state his role in The Coop or identify leadership within the organization.</p>"
);



 


	
	

