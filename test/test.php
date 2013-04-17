<?php

$chars = array_merge(range("a", "z"), range("A", "Z"));
$expected = array();

$time = 0;
foreach ($chars as $char) {
	$expected[] = array(
		"format" => $char,
		"timestamp" => $time * 1e3,
		"result" => date($char, $time)
	);
}

$time = time();
foreach ($chars as $char) {
	$expected[] = array(
		"format" => $char,
		"timestamp" => $time * 1e3,
		"result" => date($char, $time)
	);
}

?>
<script type="text/javascript">
var expected = <?php echo json_encode($expected); ?>;
</script>
<script type="text/javascript" src="../php_date.js"></script>
<script type="text/javascript" src="test.js"></script>