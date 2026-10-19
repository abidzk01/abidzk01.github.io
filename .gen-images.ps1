# =============================================================================
# Skrip pembuat gambar SEO & ikon (memakai GDI+ / System.Drawing).
#
# Menghasilkan:
#   images/og-image.png          1200x630  kartu preview sosial media
#   images/apple-touch-icon.png  180x180   ikon iOS / home screen
#   images/icon-512.png          512x512   ikon manifest PWA
#
# Ikon 180 & 512 diturunkan dari images/favicon.ico supaya identitas visual
# situs konsisten dengan favicon.
#
# Jalankan:
#   powershell -NoProfile -ExecutionPolicy Bypass -File .gen-images.ps1
# =============================================================================

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

# --- teks yang digambar ------------------------------------------------------
$Nama    = 'Abid Zakaria'
$Role    = 'FullStack Web Developer'
$Inisial = 'AZ'
$Tagline = 'Portofolio  |  Proyek  |  Keahlian  |  Kontak'

# --- palet gradien (cyan -> sky -> blue, selaras brand & favicon) ------------
$Warna1 = [System.Drawing.Color]::FromArgb(255, 6, 182, 212)    # #06b6d4 cyan
$Warna2 = [System.Drawing.Color]::FromArgb(255, 14, 165, 233)   # #0ea5e9 sky
$Warna3 = [System.Drawing.Color]::FromArgb(255, 59, 130, 246)   # #3b82f6 blue

$OutDir   = Join-Path (Get-Location) 'images'
$AvatarIn = Join-Path $OutDir 'avatar.jpg'
$IcoIn    = Join-Path $OutDir 'favicon.ico'

if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir | Out-Null }

# --- helper: gradient brush tiga warna ---------------------------------------
function New-GradienBrush {
  param([int]$W, [int]$H)
  $b = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point($W, $H)),
    $Warna1, $Warna3)
  $blend = New-Object System.Drawing.Drawing2D.ColorBlend
  $blend.Colors = @($Warna1, $Warna2, $Warna3)
  $blend.Positions = @(0.0, 0.5, 1.0)
  $b.InterpolationColors = $blend
  return $b
}

# --- helper: jalur persegi panjang bersudut bulat ----------------------------
function New-RoundPath {
  param([float]$X, [float]$Y, [float]$W, [float]$H, [float]$R)
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $R * 2
  $p.AddArc($X, $Y, $d, $d, 180, 90)
  $p.AddArc(($X + $W - $d), $Y, $d, $d, 270, 90)
  $p.AddArc(($X + $W - $d), ($Y + $H - $d), $d, $d, 0, 90)
  $p.AddArc($X, ($Y + $H - $d), $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

# --- helper: gambar teks di tengah kotak -------------------------------------
function Draw-Center {
  param($G, [string]$Text, $Font, $Brush, [float]$X, [float]$Y, [float]$W, [float]$H)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rect = New-Object System.Drawing.RectangleF($X, $Y, $W, $H)
  $G.DrawString($Text, $Font, $Brush, $rect, $sf)
  $sf.Dispose()
}

# --- helper: ambil frame terbesar dari file .ico ------------------------------
function Get-IconImage {
  param([string]$Path)
  $bytes = [System.IO.File]::ReadAllBytes($Path)
  $count = [BitConverter]::ToUInt16($bytes, 4)
  $bestOff = 0; $bestSize = 0; $bestDim = 0
  for ($i = 0; $i -lt $count; $i++) {
    $o = 6 + ($i * 16)
    $w = [int]$bytes[$o]; if ($w -eq 0) { $w = 256 }
    $sz = [BitConverter]::ToUInt32($bytes, $o + 8)
    $dataOff = [BitConverter]::ToUInt32($bytes, $o + 12)
    if ($w -gt $bestDim) { $bestDim = $w; $bestOff = $dataOff; $bestSize = $sz }
  }
  $slice = New-Object byte[] $bestSize
  [Array]::Copy($bytes, $bestOff, $slice, 0, $bestSize)
  $ms = New-Object System.IO.MemoryStream(, $slice)
  $img = [System.Drawing.Image]::FromStream($ms)
  return $img
}

# =============================================================================
# 1. og-image.png  (1200 x 630)
# =============================================================================
$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# latar gradien
$bgBrush = New-GradienBrush -W $W -H $H
$g.FillRectangle($bgBrush, 0, 0, $W, $H)
$bgBrush.Dispose()

# lingkaran dekoratif transparan
$deco = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(26, 255, 255, 255))
$g.FillEllipse($deco, 950, -120, 340, 340)
$g.FillEllipse($deco, -140, 470, 380, 380)
$deco.Dispose()

# kartu foto profil di kanan
$cardX = 830; $cardY = 175; $cardS = 280
$cardPath = New-RoundPath -X $cardX -Y $cardY -W $cardS -H $cardS -R 56

if (Test-Path $AvatarIn) {
  $avatar = [System.Drawing.Image]::FromFile($AvatarIn)
  $g.SetClip($cardPath)
  $g.DrawImage($avatar, $cardX, $cardY, $cardS, $cardS)
  $g.ResetClip()
  $avatar.Dispose()
} else {
  $cardBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(56, 255, 255, 255))
  $g.FillPath($cardBrush, $cardPath)
  $cardBrush.Dispose()
  $fInisial = New-Object System.Drawing.Font('Segoe UI', 118, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $fPutih = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
  Draw-Center -G $g -Text $Inisial -Font $fInisial -Brush $fPutih -X $cardX -Y $cardY -W $cardS -H $cardS
  $fInisial.Dispose()
  $fPutih.Dispose()
}

$cardPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 255, 255, 255), 3)
$g.DrawPath($cardPen, $cardPath)
$cardPen.Dispose()

# garis aksen kecil
$accentPath = New-RoundPath -X 100 -Y 196 -W 96 -H 9 -R 4
$accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 255, 255, 255))
$g.FillPath($accentBrush, $accentPath)
$accentBrush.Dispose()

$fPutih = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)

# nama
$fNama = New-Object System.Drawing.Font('Segoe UI', 76, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString($Nama, $fNama, $fPutih, 96, 236)
$fNama.Dispose()

# role
$fRole = New-Object System.Drawing.Font('Segoe UI', 34, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$roleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(224, 255, 255, 255))
$g.DrawString($Role, $fRole, $roleBrush, 100, 350)
$fRole.Dispose()
$roleBrush.Dispose()

# keterangan bawah
$fKecil = New-Object System.Drawing.Font('Segoe UI', 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$kecilBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 255, 255, 255))
$g.DrawString($Tagline, $fKecil, $kecilBrush, 100, 430)
$fKecil.Dispose()
$kecilBrush.Dispose()
$fPutih.Dispose()

$ogPath = Join-Path $OutDir 'og-image.png'
$g.Dispose()
$bmp.Save($ogPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host ("OK  " + $ogPath + "  (" + $W + "x" + $H + ")")

# =============================================================================
# 2. apple-touch-icon.png (180x180) dan icon-512.png (512x512)
#    Diturunkan dari frame terbesar favicon.ico, diperbesar sedikit agar sudut
#    membulat ikon ikut terpotong (aman untuk maskable icon & iOS).
# =============================================================================
if (Test-Path $IcoIn) {
  $iconImg = Get-IconImage -Path $IcoIn
  Write-Host ("    sumber ikon: " + $IcoIn + "  (" + $iconImg.Width + "x" + $iconImg.Height + ")")

  foreach ($size in @(180, 512)) {
    $bmp2 = New-Object System.Drawing.Bitmap($size, $size)
    $g2 = [System.Drawing.Graphics]::FromImage($bmp2)
    $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # dasar navy agar sudut transparan tidak jadi hitam di iOS
    $g2.Clear([System.Drawing.Color]::FromArgb(255, 11, 17, 32))

    $overscan = [double]$size * 0.03
    $side = [double]$size + ($overscan * 2)
    $g2.DrawImage($iconImg, [float](-$overscan), [float](-$overscan), [float]$side, [float]$side)
    $g2.Dispose()

    $name = if ($size -eq 180) { 'apple-touch-icon.png' } else { 'icon-512.png' }
    $p2 = Join-Path $OutDir $name
    $bmp2.Save($p2, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp2.Dispose()
    Write-Host ("OK  " + $p2 + "  (" + $size + "x" + $size + ")")
  }

  $iconImg.Dispose()
} else {
  Write-Warning ("favicon.ico tidak ditemukan di " + $IcoIn + " - ikon 180/512 dilewati.")
}

Write-Host '---'
Write-Host 'selesai: og-image + apple-touch-icon + icon-512'
