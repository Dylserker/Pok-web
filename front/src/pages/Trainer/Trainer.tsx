import { useMemo, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import FormSwitch from '../../components/Buttons/FormSwitch/FormSwitch'
import GameSelect from '../../components/ComboBox/GameSelect/GameSelect'
import AreaSelect from '../../components/ComboBox/AreaSelect/AreaSelect'
import RegionSelect from '../../components/ComboBox/RegionSelect/RegionSelect'
import './Trainer.css'

function Trainer() {
  const [selectionMode, setSelectionMode] = useState<'game' | 'region'>('game')
  const [selectedGame, setSelectedGame] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedArea, setSelectedArea] = useState('')

  const switchOptions = useMemo(
    () => [
      { value: 'game', label: 'Par jeu' },
      { value: 'region', label: 'Par région' },
    ],
    []
  )

  const handleModeChange = (mode: string) => {
    if (mode !== 'game' && mode !== 'region') {
      return
    }

    setSelectionMode(mode)

    if (mode === 'game') {
      setSelectedRegion('')
      setSelectedArea('')
    } else {
      setSelectedGame('')
    }
  }

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region)
    setSelectedArea('')
  }

  return (
    <div className="trainer">
      <Header />
      <div className="trainer__content">
        <h1>Trainer Page</h1>
        <p>Choisis ton mode de sélection, puis fais un seul choix: soit par jeu, soit par région.</p>
        <FormSwitch
          options={switchOptions}
          currentValue={selectionMode}
          onChange={handleModeChange}
          ariaLabel="Mode de sélection du trainer"
        />

        {selectionMode === 'game' ? (
          <GameSelect
            value={selectedGame}
            onGameChange={setSelectedGame}
            label="Sélection via le jeu"
          />
        ) : (
          <>
            <RegionSelect
              value={selectedRegion}
              onRegionChange={handleRegionChange}
              label="Sélection via la région"
            />
            <AreaSelect
              region={selectedRegion}
              value={selectedArea}
              onAreaChange={setSelectedArea}
              label="Sélection de la zone"
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Trainer