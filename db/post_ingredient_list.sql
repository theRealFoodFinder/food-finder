UPDATE pantries
SET items =
$2 WHERE user_id = $1;
