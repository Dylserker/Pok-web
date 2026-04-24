import './TableOst.css'

export type OstTrack = {
	id: string
	title: string
	game: string
	audioUrl: string
}

type TableOstProps = {
	tracks?: OstTrack[]
}

function TableOst({ tracks = [] }: TableOstProps) {
	return (
		<section className="table-ost" aria-label="Table des OST Pokemon">
			<table className="table-ost__table">
				<colgroup>
					<col className="table-ost__col-title" />
					<col className="table-ost__col-game" />
					<col className="table-ost__col-audio" />
				</colgroup>
				<thead>
					<tr>
						<th scope="col">Nom</th>
						<th scope="col">Jeu</th>
						<th scope="col">Piste audio</th>
					</tr>
				</thead>
				<tbody>
					{tracks.length > 0 ? (
						tracks.map((track) => (
							<tr key={track.id}>
								<td>{track.title}</td>
								<td>{track.game}</td>
								<td className="table-ost__audio-cell">
									<div className="table-ost__audio-wrap">
										<audio controls preload="none" src={track.audioUrl}>
											Votre navigateur ne supporte pas la lecture audio.
										</audio>
									</div>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={3} className="table-ost__empty">
								Aucune OST disponible pour le moment.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	)
}

export default TableOst