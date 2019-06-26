<?php
$input = $_GET['search'];
$channel = $_GET['channel'];
$search = $input;
include_once "conf/info.php";
include_once "header.php";
include_once "api/api_search.php";
?>

<div>
	<h1 style="margin-left: 40px;">Search Result : <?php echo $input ?> </h1>
	<br>


	<div id="isi">


		<?php
		include "conf/info.php";
		include_once "api/api_popular.php";
		if ($channel == "movie") {
			foreach($search->results as $p){
				$backdrop 	= $p->poster_path;
				if (empty($backdrop) && is_null($backdrop)) {
					$backdrop = 'images/no-gambar.jpg';
				} else {
					$backdrop = 'http://image.tmdb.org/t/p/w500' . $backdrop;
				}
				echo '
				<div id="dalam" >
				<a href="movie.php?id=' . $p->id . '">
				<div id="lala" tabindex="1">
				<img src="'. $backdrop . '" alt="Poster Movie" style="width: 100%;">
				<p>' . $p->title . ' ('. substr($p->release_date, 0, 4) . ')</p>
				</div>
				</a>
				</div>';
			}
		}elseif ($channel == "tv") {
			foreach($search->results as $p){
				$backdrop 	= $p->poster_path;
				if (empty($backdrop) && is_null($backdrop)) {
					$backdrop = 'images/no-gambar.jpg';
				} else {
					$backdrop = 'http://image.tmdb.org/t/p/w500' . $backdrop;
				}
				echo '
				<div id="dalam" >
				<a href="tvshow.php?id=' . $p->id . '">
				<div id="lala" tabindex="1">
				<img src="'. $backdrop . '" alt="Poster Movie" style="width: 100%;">
				<p>' . $p->name . ' ('. substr($p->first_air_date, 0, 4) . ')</p>
				</div>
				</a>
				</div>';
			}
		}


		?>
	</div>
</div>

<?php
include_once "footer.php";
?> 
