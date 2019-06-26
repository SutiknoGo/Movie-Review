<?php
$id_tv = $_GET['id'];
include "conf/info.php";
include_once "api/api_tv_id.php";
include_once "api/api_tv_video_id.php";
include_once "header.php";

?>

<?php
if (isset($_GET['id'])) {
  $id_tv = $_GET['id'];
  ?>

  <div>
    <div role="content">
      <div class="ui-grid-a"> 
        <div class="judul-block">
          <h1 class="judul-detail"><?php echo $tv_id->name ?></h1>
        </div>

        <div class="tag-block">
          <h1 class="tag-detail"><?php foreach ($tv_id->genres as $g) {
            echo '<span>' . $g->name . ', </span> ';
          }?> </h1>
        </div>
      </div><!-- /grid-a -->


      <div class="ui-grid-a">
        <div class="ui-block-a"><div class="ui-bar ui-bar-a image-block" style="height:90%">
          <img src="http://image.tmdb.org/t/p/w780<?php echo $tv_id->poster_path ?>" class="poster">



        </div></div> <!-- /ui-block-a left grid  -->

        <div class="ui-block-b">

          <h2 class="main-title">Status : </h2>
          <p class="date-detail"><?php echo $tv_id->status ?></p>

          <h2 class="main-title">Release Date : </h2>
          <p class="date-detail"><?php
          $rel = date('d F Y', strtotime($tv_id->last_air_date));
          echo $rel;
          ?></p>

          <h2 class="main-title">Production Countries: </h2>
          <p class="countries-detail"><?php
          foreach ($tv_id->origin_country as $pco) {
            echo $pco . "&nbsp;&nbsp;";
          }
          ?></p>

          <h2 class="main-title">Production Companies : </h2>
          <p class="companies-detail"><?php
          foreach ($tv_id->production_companies as $pc) {
            echo $pc->name . ", ";
          }
          ?></p>

<!--           <h2 class="main-title">Budget Overall: </h2>
          <p class="budget-detail">$ <?php echo number_format($tv_id->budget); ?></p> -->

          <h2 class="main-title">Total Vote: </h2>
          <p class="vote-detail"><?php echo $tv_id->vote_count; ?> <i class="fa fa-users"></i> </p>

          <h2 class="main-title">Vote Average: </h2>
          <p class="rating-detail"><?php echo $tv_id->vote_average; ?> <i class="fa fa-star" style="color:gold;"></i> </p>

          <h2 class="main-title">Overview: </h2>
          <p class="overview-detail"><?php echo $tv_id->overview;?>
        </p>
      </div><!-- ui-block-b right grid -->

    </div><!-- /grid-a -->
    <br>
  </div><!-- content -->


</div>
<?php } else {
  echo "<h5 id='title'> Movie not Found ! </h5>";
}
?>

<!-- =============================================== -->

<div style="background-color: black;">
  <h2 align="center" style="padding: 10px; color: white;">Similar TV Shows</h2>
</div>
  <div>
    <div id="isi">

      <?php
      include "conf/info.php";
      foreach($tv_id_similar->results as $p){
        echo '
        <div id="dalam" >
        <a href="movie.php?id=' . $p->id . '">
        <div id="lala" tabindex="1">
        <img src="http://image.tmdb.org/t/p/w500'. $p->poster_path . '" alt="Poster Movie">
        <p>' . $p->name . ' ('. substr($p->first_air_date, 0, 4) . ')</p>
        </div>
        </a>
        </div>';
      }
      ?>
    </div>
  </div>

<!-- =============================================== -->


<?php
include_once "footer.php";
?>

